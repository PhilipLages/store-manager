const Joi = require('joi');
const httpStatus = require('../utils/httpStatus');

const validSale = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}).required().messages({
  'number.empty': '{#label} is required',
  'number.min': '{#label} must be greater than or equal to {#limit}',
});

const validateId = async (req, res, next) => {
  const sale = req.body;

  const { error } = validSale.validate(sale);

  if (!sale.productId) {
    return res.status(httpStatus.REQUIRED).json({ message: error.message });
  };

  return next();
};

const validateQuantity = async (req, res, next) => {
  const sale = req.body;

  const { error } = validSale.validate(sale);

  if (sale.quantity === null) {
    return res.status(httpStatus.REQUIRED).json({ message: error.message });
  }
  if (sale.quantity < 1) {
    return res.status(httpStatus.UNPROC_ENTITY).json({ message: error.message });
  }

  return next();
};

module.exports = {
  validateId,
  validateQuantity,
};
