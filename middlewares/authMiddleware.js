import jwt from 'jsonwebtoken';
const vertifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
       return res.status(401).json({
            success: false,
            message: 'Đăng nhập trước khi sử dụng dịch vụ'
        });
    } else {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
               return res.status(403).json({
                    success: false,
                    message: 'Token không hợp lệ!'
                });
            } 
                req.user = user;
                next();
        }); 
    }
};

export{vertifyToken}