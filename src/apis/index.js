const userRoutes = require('./routers/user');
const productRoutes = require('./routers/product');

module.exports = (app) => {
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);
};
