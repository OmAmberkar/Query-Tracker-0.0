import logger from "../utils/logger.utils.js";

export const authenticateUser = (req, res, next) => {
    const { email, role } = req.cookies;
    if (!email) {
        logger.warn('Auth failed: No email cookie found');
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    // Fallback if role is not in cookie for some reason, but usually it should be
    const userRole = role || 'user';

    req.user = { email, role: userRole };
    logger.info(`User authenticated: ${email} with role ${userRole}`);
    next();

}