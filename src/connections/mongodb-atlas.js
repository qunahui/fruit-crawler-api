const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.ATLAS_DATABASE_USER}:${process.env.ATLAS_DATABASE_PASSWORD}@${process.env.ATLAS_DATABASE_DOMAIN}/${process.env.ATLAS_DATABASE_NAME}?retryWrites=true&w=majority`;

console.log(uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connects database successfully!');
  })
  .catch((error) => {
    console.log(error);
  });
