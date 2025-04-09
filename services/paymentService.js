import { Query, Types } from "mongoose";
import crypto from "crypto";
import querystring from "querystring";
import DB_CONNECTION from "../model/DBConnection.js";
import { generateID } from "../configs/constants.js";
import dotenv from 'dotenv';
import path from "path";

dotenv.config();
const ObjectId = Types.ObjectId

const formatDateTime = () => { 
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate() + 1).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes() + 1).padStart(2, '0');
    const seconds = String(now.getSeconds() + 1).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`
}

function sortObject(obj) {
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
        sorted[key] = obj[key];
    });
    return sorted;
}

const bookTicketMovieService = async (id,user,showtimeId, seats) => {
    const showtime = await DB_CONNECTION.Showtime.findById(showtimeId)
        .populate({
            path: "room",
            populate: {
                path: "seats"
            }
        });
    if (!showtime) {
        return {
            success: false,
            code: 404,
            message: 'không tìm thấy xuất chiếu'
        }
    };
    
    if (showtime.startTime <= Date.now()) {
        return {
            success: false,
            code: 404,
            message: 'Đã qua xuất chiếu'
        }
    };

    // danh sách ghế đã được đặt trong xuất chiếu
    const bookedSeats = showtime.bookedSeats.map(seat => seat.toString());
    //kiểm tra ghế đã được đặt chưa
    const alreadyBookedSeats = seats.filter(seat => bookedSeats.includes(seat));
    if (alreadyBookedSeats.length > 0) {
        return {
            success: false,
            code: 400,
            message: `Các ghế sau đã được đặt: ${alreadyBookedSeats.join(', ')}`
        };
    }

    const selectedSeats = showtime.room.seats.filter(seat => seats.includes(seat._id.toString()));

    const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    

    const newTicket = new DB_CONNECTION.Ticket({
        id:id,
        showtime: showtimeId,
        seats: seats,
        totalPrice: totalPrice,
        user:new ObjectId(user._id)
    });

    await newTicket.save();
    return {
        success: true,
        code: 200,
        message: 'Đặt vé thành công',
        ticket: newTicket
    };
};

const CONFIG_VNPAY = {
    tmnCode: process.env.VNP_TMNCODE,
    hashSecret: process.env.VNP_HASHSECRET_KEY,
    url: process.env.VNP_URL,
    returnUrl: process.env.VNP_RETURN_URL,
};


const createPaymentUrlVNPayService = async (ticketId, ip) => { 
    const ticket = await DB_CONNECTION.Ticket.findOne({ id: ticketId });
    if (!ticket) {
        return {
            success: false,
            code: 404,
            message: 'Đặt vé thành công',
        }
    }
    
    if (!CONFIG_VNPAY.tmnCode || !CONFIG_VNPAY.hashSecret || !CONFIG_VNPAY.url) {
        return {
            success: false,
            code: 500,
            message: 'Cấu hình thanh toán không hợp lệ',
        };
    }

    // Tạo các tham số thanh toán
    const dateFormat = formatDateTime();
    const tmnCode = CONFIG_VNPAY.tmnCode;
    const secretKey = CONFIG_VNPAY.hashSecret;
    const amount = Math.round(ticket.totalPrice * 100);
    const orderInfo = `Thanh toan don hang ${ticketId}`;
    const returnUrl = CONFIG_VNPAY.returnUrl;
    const orderType = 'other';
    const txnRef = `${ticketId}-${generateID(4)}`; // Thêm số ngẫu nhiên để tránh trùng lặp
    let vnpUrl = CONFIG_VNPAY.url;

    const vnp_Params = {
        'vnp_Version': '2.1.0',
        'vnp_Command': 'pay',
        'vnp_TmnCode': tmnCode,
        'vnp_Locale': 'vn',
        'vnp_CurrCode': 'VND',
        'vnp_TxnRef': txnRef,
        'vnp_OrderInfo': orderInfo,
        'vnp_OrderType': orderType,
        'vnp_Amount': amount,
        'vnp_ReturnUrl': returnUrl,
        'vnp_IpAddr': ip || '127.0.0.1',
        'vnp_CreateDate': dateFormat
    };

    const sortedVnpParams = sortObject(vnp_Params);
    // Tạo chuỗi dữ liệu cần ký
    const signData = new URLSearchParams(sortedVnpParams).toString();
    // tạo chữ ký
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex"); 
    console.log(signed);

    //thêm chữ ký vào tham số thanh toán
    vnpUrl += '?' + signData + '&vnp_SecureHash=' + signed;

    return {
        success: true,
        code: 200,
        message: 'Tạo url thanh toán thành công',
        data: vnpUrl
    }
}   

const vnPayRetrunService = async (vnp_Params) => { 
    // lấy chữ ký
    const vnp_SecureHash = vnp_Params['vnp_SecureHash'];
    // xóa chữ ký
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    // sắp xếp params
    const sortedVnpParams = sortObject(vnp_Params);
    // tạo chuỗi params
    const signData = new URLSearchParams(sortedVnpParams).toString();
    // tạo chữ ký
    const hmac = crypto.createHmac("sha512", CONFIG_VNPAY.hashSecret,)
    const checksum = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");
    // so sánh chữ ký
    if (vnp_SecureHash == checksum) {
        const responseCode = vnp_Params['vnp_ResponseCode'];
        const txnRef = vnp_Params['vnp_TxnRef'];
        const ticketId = txnRef.split('-')[0];
        if (responseCode == '00') {
           const ticket =  await DB_CONNECTION.Ticket.findOneAndUpdate({ id: ticketId },
                {
                    status: "paid",
                    paymentTime: new Date(),
                    updated_at: new Date()
                }
           ).populate([
               {
                   path: "showtime",
                   populate: [
                       { path: "movie" }, 
                       { path: "cinema", select: "name" }, 
                       { path: "room", select: "name" }
                   ]
               }
           ]);
            
            await DB_CONNECTION.User.findOneAndUpdate(
            { _id: ticket.user },
            { $inc: { ticketsBooked: 1 } },
            { new: true } // nếu muốn nhận bản ghi sau khi update
          );

            const showtime = await DB_CONNECTION.Showtime.findOne({_id: ticket.showtime})
            showtime.bookedSeats.push(...ticket.seats);
            await showtime.save();
            return {
                success: true,
                message: "Thanh Toán Thành Công",
                code:200,
                data: {
                    ticket:ticket,
                    amount: vnp_Params['vnp_Amount'] / 100,
                    transactionNo: vnp_Params['vnp_TransactionNo'],
                    bankCode: vnp_Params['vnp_BankCode'],
                    responseCode:responseCode
                }
            }
        } else {
            await DB_CONNECTION.Ticket.findOneAndUpdate({ id: ticketId },
                {
                    status: "failed",
                    updated_at: new Date()
                }
            );
            return {
                succes: false,
                message: "Thanh Toán Thất Bại",
                code:400,
                data: {
                    ticketId,
                    responseCode:responseCode
                }
            }
            
        }
    } else {
        return {
            succes: false,
            code:400,
            message:"Chứ ký không hợp lệ"
        }
    }
}

export { bookTicketMovieService,createPaymentUrlVNPayService, vnPayRetrunService };