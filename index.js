import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {loadBackend} from './src/back/index.js';
import {handler} from './src/front/build/handler.js';

let PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

loadBackend(app);
app.use(handler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

