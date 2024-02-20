// server.ts

import express, { Application } from 'express';
import TagRoute from './tag/routes/TagRoute';
import CatRoute from './Category/routes/categoryRoute';
import productRoute from './product/routes/productRoute';


import "reflect-metadata";

import { AppDataSource } from "./data-source";
const app: Application = express();
const port = process.env.PORT || 5000;

// پارس کردن بدنه‌ی درخواست به صورت JSON
app.use(express.json());

// افزودن مسیرهای مربوط به محصولات
app.use('/api', TagRoute);
app.use('/api', CatRoute);

app.use('/api', productRoute);




 AppDataSource.initialize()

app.listen(port, () => {
  console.log(`سرور در حال اجراست و درگاه ${port} را گوش می‌دهد.`);
});


