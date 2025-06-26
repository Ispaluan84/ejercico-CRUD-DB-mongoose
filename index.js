const express = require('express');
const app = express();
const connectDB = require('./config/config');
const taskRouter = require('./routes/tasks')


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', taskRouter)

connectDB();

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));