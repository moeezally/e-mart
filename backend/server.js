import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import rentingRoutes from './routes/rentingRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import gardenRoutes from "./routes/gardenRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/forum', forumRoutes)
app.use('/api/garden', gardenRoutes)
app.use('/api/products', productRoutes)
app.use('/api/rentings', rentingRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

/**
 * Serving React App
 */
const reactPath = new URL('../frontend/build', import.meta.url).pathname;
app.use(express.static(reactPath));
app.use('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(reactPath, 'index.html'));
});
 

app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
