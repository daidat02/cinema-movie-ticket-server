
const validateSeatSelection = async (req, res) => {
    const { selectedSeatIds, roomId } = req.body; // Đổi tên selectedSeats -> selectedSeatIds
    const maxSeats = 6;

    try {
        // Kiểm tra số lượng ghế
        if (selectedSeatIds.length === 0) {
            return res.status(400).json({ error: 'Vui lòng chọn ít nhất một ghế' });
        }
        if (selectedSeatIds.length > maxSeats) {
            return res.status(400).json({ error: `Số lượng ghế tối đa là ${maxSeats}` });
        }

        // Kiểm tra ghế đầu/cuối hàng
        const validationResult = await validateFirstAndLastSeat(selectedSeatIds, roomId);
        if (!validationResult.valid) {
            return res.status(400).json({ error: validationResult.message });
        }

        // Kiểm tra trùng lặp ghế
        const uniqueSeats = [...new Set(selectedSeatIds)];
        if (uniqueSeats.length !== selectedSeatIds.length) {
            return res.status(400).json({ error: 'Có ghế được chọn nhiều lần' });
        }

        // Kiểm tra ghế đã được đặt chưa
        const existingBookings = await DB_CONNECTION.Booking.find({ 
            seat: { $in: selectedSeatIds },
            status: 'confirmed'
        });

        if (existingBookings.length > 0) {
            const bookedSeatIds = existingBookings.map(b => b.seat.toString());
            return res.status(400).json({ 
                error: 'Một số ghế đã được đặt',
                bookedSeatIds
            });
        }

        return res.json({ 
            success: true,
            message: 'Ghế hợp lệ, có thể đặt'
        });

    } catch (error) {
        console.error('Lỗi khi kiểm tra ghế:', error);
        return res.status(500).json({ error: 'Lỗi server khi kiểm tra ghế' });
    }
}

const validateFirstAndLastSeat = async (selectedSeatIds, roomId) => {
    try {
        const room = await DB_CONNECTION.Room.findOne({ _id: roomId })
                            .populate('seats');
        if (!room) {
            throw new Error('Không tìm thấy phòng');
        }

        const allSeats = room.seats;

        // Nhóm ghế theo hàng
        const seatsByRow = {};

        allSeats.forEach(seat => {
            const row = seat.seatNumber.charAt(0);
            if (!seatsByRow[row]) seatsByRow[row] = [];
            seatsByRow[row].push(seat); // Lưu cả object seat thay vì chỉ seatNumber
        });

        // Kiểm tra từng hàng
        for (const row in seatsByRow) {
            const rowSeats = seatsByRow[row];
            const firstSeat = rowSeats[0];
            const lastSeat = rowSeats[rowSeats.length - 1];
            
            // Lấy danh sách _id của các ghế được chọn trong hàng này
            const selectedInRow = selectedSeatIds.filter(seatId => {
                const seat = allSeats.find(s => s._id.equals(seatId));
                return seat && seat.seatNumber.startsWith(row);
            });

            if (selectedInRow.length > 0) {
                // Kiểm tra ghế đầu hàng
                if (!selectedInRow.includes(firstSeat._id.toString())) {
                    return {
                        valid: false,
                        message: `Ghế đầu hàng ${row} (${firstSeat.seatNumber}) phải được đặt`
                    };
                }
              
                // Kiểm tra ghế cuối hàng
                if (!selectedInRow.includes(lastSeat._id.toString())) {
                    return {
                        valid: false,
                        message: `Ghế cuối hàng ${row} (${lastSeat.seatNumber}) phải được đặt`
                    };
                }
            }
        }
        return { valid: true };

    } catch (error) {
        console.error('Lỗi khi kiểm tra ghế đầu/cuối hàng:', error);
        return {
            valid: false,
            message: 'Lỗi khi kiểm tra ghế đầu/cuối hàng'
        };
    }
}