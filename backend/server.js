import express from 'express';
import cors from 'cors';
import router from './routes/index.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(3000, console.log('Backend running at local 3000'));

export default app;