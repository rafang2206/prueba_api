import express from 'express';
import { authRouter, 
        productRouter, 
        userRouters } from './src/routes/index.js';
import dotenv from 'dotenv';
import { uploadsDir } from './src/utils/dir.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/static', express.static(uploadsDir));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouters);

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})