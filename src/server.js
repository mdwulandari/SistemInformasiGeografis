const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const PORT = 5035;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
