import bcrypt from "bcrypt";
import DB_CONNECTION from "../model/DBConnection.js";
import  jwt  from "jsonwebtoken";

const registerAccountService = async (id, name, email, phoneNumber, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = DB_CONNECTION.User({
        id,
        name,
        email,
        phoneNumber,
        password: hashed
    });
    await newUser.save();

    return {
        success: true,
        code: 201,
        message: 'Đăng ký tài khoản thành công',
        data: newUser
    };
};

const generateAccessToken = async (user) => {
    return jwt.sign({
        _id: user._id,
    },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '1h' }
    );
}
const generateRefreshToken = async (user) => {
    return jwt.sign({
        _id: user._id,
    },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '365d' }
    );
}
const loginAccountService = async (phoneNumber, password) => {
    const user = await DB_CONNECTION.User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
        return {
            code: 404,
            success: false,
            message: 'Số điện thoại không đúng hoặc chưa được đăng ký!'
        };
    };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return {
            code: 404,
            success: false,
            message: 'Mật khẩu không đúng!'
        };
    };

    if (user && validPassword) {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        const { password,...other } = user._doc;
        return {
            message: 'Đăng nhập thành công',
            code: 200,
            user: other,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        
    };
};


export { registerAccountService,loginAccountService}