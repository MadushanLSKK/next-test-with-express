import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});



app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  
  
});