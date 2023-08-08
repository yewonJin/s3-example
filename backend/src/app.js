const express = require('express');
const cors = require('cors');
const router = require('./routes/image');

const app = express();
const port = 4000;

app.use(
   cors({
      origin: true,
   }),
);

app.use('/image', router);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
