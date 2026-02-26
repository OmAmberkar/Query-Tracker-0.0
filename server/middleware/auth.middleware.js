import logger from "../utils/logger.utils.js";

export const authenticateUser = (req,res,next) =>{
    const {email,role} = req.cookies;
    if(!email)
        {
            logger.warn('Auth failed: No email cookie found');
            return res.status(401).json({ message: "Unauthorized: Please log in" });
        }
    req.user = { email, role };
    logger.info(`User authenticated: ${email}`);
    next();

}