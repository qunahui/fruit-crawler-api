const userRoutes = require("./routers/user");
const productRoutes = require("./routers/product");
const paginationRoutes = require("./routers/pagination");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/pagination", paginationRoutes);
};
