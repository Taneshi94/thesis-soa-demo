const express = require('express');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationRoutes');
const { errorHandler } = require('./errorHandler');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

app.use('/api/registrations', registrationRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Registration Service running on port ${PORT}`);
});