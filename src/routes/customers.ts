import express, {Request, Response, NextFunction} from 'express';
import fs, {writeFileSync, readFileSync} from 'fs';
import path from 'path';
import ejs from 'ejs'
import Customer from './interface';

const router = express.Router();

let dbpath = path.resolve('./src/database.json')

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  
  const data = JSON.parse(readFileSync(dbpath, {encoding: 'utf-8'}))
  res.render('index_customers', { 
      title: 'CUSTOMER RELASHIONSHIP MANAGEMENT SYSTEM',
      customers: data
  })
})

router.get('/add', (req: Request, res: Response, next: NextFunction) => {
  res.render('add_customer', {
      title: 'CUSTOMER RELASHIONSHIP MANAGEMENT SYSTEM'
  })
})

router.post('/save', (req: Request, res: Response, next: NextFunction) => {

  const file = fs.readFileSync(dbpath, {encoding:'utf8', flag:'r'});
  const readData = JSON.parse(file);

    let {fullname, email, gender, phone, address, notes} = req.body

    let customer = {
        customerid: readData.length + 1,
        fullname: fullname,
        email: email,
        gender: gender,
        phone: phone,
        address: address,
        notes: notes
      }

      readData.push(customer)
      fs.writeFileSync(dbpath, JSON.stringify(readData));
      res.status(201)
      res.redirect('/')
})

router.get('/edit/:id', (req: Request, res: Response, next: NextFunction) => {

  const data = JSON.parse(readFileSync(dbpath, {encoding: 'utf-8'}))
  let customerData = data.find((value: Customer) => value.customerid === parseInt(req.params.id))
  res.render('update_customer', {
      title: 'CUSTOMER RELASHIONSHIP MANAGEMENT SYSTEM',
      customer: customerData
  })
})

router.post('/update', (req: Request, res: Response, next: NextFunction) => {

  const file = fs.readFileSync(dbpath, {encoding:'utf8', flag:'r'});
  const readData = JSON.parse(file);
    let customer = readData.find((value: Customer) => value.customerid === parseInt(req.body.id))
    if (!customer) return res.status(404).send("Customer not found!")

        let {fullname, email, gender, phone, address, notes} = req.body

        customer.fullname = fullname? fullname: customer.fullname,
        customer.email = email? email: customer.email,
        customer.gender = gender? gender: customer.gender,
        customer.phone = phone? phone: customer.phone,
        customer.address = address? address: customer.addres,
        customer.notes = notes? notes: customer.notes

        fs.writeFileSync(dbpath, JSON.stringify(readData));
        res.status(202)
        res.redirect('/')
    })

router.get('/delete/:id', (req: Request, res: Response, next: NextFunction) =>{

  const file = fs.readFileSync(dbpath, {encoding:'utf8', flag:'r'});
  const readData = JSON.parse(file);

    let customer = readData.find((value: Customer) => value.customerid === parseInt(req.params.id))
    if(!customer) return res.status(404).send('Customer not found!')

    let index = readData.indexOf(customer)
    readData.splice(index, 1)

    fs.writeFileSync(dbpath, JSON.stringify(readData));
    res.status(200)
    res.redirect('/')

})

 export default router;