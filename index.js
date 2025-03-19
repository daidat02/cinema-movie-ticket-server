import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './configs/db.js';

import routes from './routes/index.js';

const app = express();

dotenv.config();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Kết nối database
db.connect();
// Routes
app.use('/api', routes);

app.listen(3000,'0.0.0.0', () => {
    console.log(`Server is running on port 3000`);
});