import express from 'express'
import path from 'path'
import morgan from 'morgan'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import ImageRoutes from './routes/ImageRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
connectDB()

app.use('/api/users', userRoutes)
app.use('/api/images', ImageRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dobby/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend','dobby', 'build', 'index.html')))
} else {
   app.get('/', (req,res) => {
       res.send("Hello World")
   })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))