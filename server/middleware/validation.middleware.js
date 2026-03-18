import Joi from 'joi';

// User registration validation
export const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    teamName: Joi.string().max(50).allow('', null).optional(),
    contact: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().optional(), // Allow if sent from frontend
    isAdminRequested: Joi.boolean().optional(),
    adminSecret: Joi.string().allow('', null).optional(),
    role: Joi.string().valid('user', 'admin').default('user')
  }).unknown(true); // Allow other metadata

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

// User login validation
export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

// Ticket validation
export const validateTicket = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    grpno: Joi.string().required(),
    teamName: Joi.string().allow('', null).optional(), // Can be empty from frontend as backend fills it
    subject: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(10).max(2000).required(),
    status: Joi.string().valid('open', 'resolved').default('open')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};
