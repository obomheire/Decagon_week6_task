import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import customers from './routes/customers'

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

// app.use(express.static(`${__dirname}/../static/style.css`));

// app.use(express.static(__dirname + '../public'));

app.use(express.static(path.resolve('src/public')))


app.use('/', customers)

app.set('view engine', 'ejs')

app.set('views', `./views`)

console.log(`./views`)

export default app