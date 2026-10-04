const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const { errorHandler } = require('./errorHandler');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Student Service running on port ${PORT}`);
});