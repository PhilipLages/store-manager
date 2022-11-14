const httpStatus = require('../utils/httpStatus');

const validateId = (req, res, next) => {
  const products = req.body;

  const isIdValid = products.every(({ productId }) => productId);

  if (!isIdValid) {
    return res.status(httpStatus.REQUIRED).json({ message: '"productId" is required' });
  } 

  return next();
};

const validateQuantity = (req, res, next) => {
  const products = req.body;

  const quantityExists = products.map(({ quantity }) => quantity)
    .every((quantity) => quantity !== undefined);
  
  const isQuantityValid = products.every(({ quantity }) => quantity >= 1);

  if (!quantityExists) {
    return res.status(httpStatus.REQUIRED).json({ message: '"quantity" is required' });
  } 
  if (!isQuantityValid) {
    return res.status(httpStatus.UNPROC_ENTITY)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = {
  validateId,
  validateQuantity,
};
