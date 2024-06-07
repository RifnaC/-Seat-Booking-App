import  JsonWebToken  from "jsonwebtoken";

export const verityToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({error: "Unauthorized"})
        }
        const decoded = JsonWebToken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Error in verifying token"});
    }
}