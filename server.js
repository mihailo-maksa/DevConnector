// MongoDB Connection String:
// mongodb+srv://Mikan123:mikan123@devconnector-p3tmx.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API is Running.'));

const PORT = process.env.PORT || 5002;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${PORT}.`);
});
