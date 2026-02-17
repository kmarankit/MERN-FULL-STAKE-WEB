import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Headers received:", req.headers); // Debug 1

    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log("No token found in request");
        return res.status(401).json({ message: "No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Data:", decoded); // Debug 2
       req.user = { 
        id: decoded.id, 
        _id: decoded.id, 
        email: decoded.email 
    };
        next();
    } catch (err) {
        console.log("JWT Verification Failed:", err.message); // Debug 3
        return res.status(401).json({ message: "Invalid Token" });
    }
};
export default authMiddleware;