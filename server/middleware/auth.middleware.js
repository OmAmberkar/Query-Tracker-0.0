import logger from "../utils/logger.utils.js";

export const authenticateUser = (req, res, next) => {
    // Check cookies first
    let email = req.cookies.email;
    let role = req.cookies.role;

    // Fallback to headers if cookies are blocked/missing
    if (!email) {
        email = req.headers['x-user-email'];
        role = req.headers['x-user-role'];
    }

    if (!email) {
        logger.warn('Auth failed: No email found in cookies or headers');
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const userRole = role || 'user';

    req.user = { email, role: userRole };
    logger.info(`User authenticated: ${email} with role ${userRole} (via ${req.cookies.email ? 'cookie' : 'header'})`);
    next();
}