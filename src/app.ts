import express, {Request, Response, NextFunction} from 'express';
import customers from './routes/customers'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', customers)
app.set('view engine', 'ejs')
app.set('views', `./views`)
console.log(`./views`)

export default app