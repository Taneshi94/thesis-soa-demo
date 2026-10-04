const express = require('express');
const cors = require('cors');
const topicRoutes = require('./routes/topicRoutes');
const { errorHandler } = require('./errorHandler');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.use('/', topicRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Topic Service running on port ${PORT}`);
});