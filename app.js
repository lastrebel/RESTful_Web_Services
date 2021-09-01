const express = require('express');

const app = express();
const port = process.env.PORT || 3005;
app.get('/', (req, res) => {
  res.send('Welcome to my Nodamon API.');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
