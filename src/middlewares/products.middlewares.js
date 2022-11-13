const Joi = require('joi');
const httpStatus = require('../utils/httpStatus');

const validProduct = Joi.object({
  name: Joi.string().min(5).required(),
}).required().messages({
  'string.empty': '{#label} is required',
  'string.min': '{#label} length must be at least {#limit} characters long'
});

const validateProduct = async (req, res, next) => {
  const product = req.body;

  const { error } = validProduct.validate(product);

  if (!product.name) return res.status(httpStatus.REQUIRED).json({ message: error.message });
  if (product.name.length < 5) return res.status(httpStatus.UNPROC_ENTITY).json({ message: error.message });

  return next();
};

module.exports = {
  validateProduct,
};