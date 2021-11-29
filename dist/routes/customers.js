"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.default.Router();
var dbpath = path_1.default.resolve('src/database.json');
var dbpath2 = path_1.default.resolve('src/user.json');
var key = [];
'';
router.get('/', function (req, res, next) {
    if (key.length === 0)
        res.render('login');
    else {
        var data = JSON.parse((0, fs_1.readFileSync)(dbpath, { encoding: 'utf-8' }));
        res.render('index_customers', {
            title: 'CUSTOMER RELASHIONSHIP MANAGEMENT SYSTEM',
            customers: data
        });
    }
});
router.get('/login', function (req, res, next) {
    res.render('login');
    key.pop();
});
router.post('/login', function (req, res, next) {
    var file = fs_1.default.readFileSync(dbpath2, { encoding: 'utf8', flag: 'r' });
    var readData = JSON.parse(file);
    var _a = req.body, username = _a.username, password = _a.password;
    var loginData = readData.find(function (value) { return value.username === username && value.password === password; });
    if (loginData) {
        var data = JSON.parse((0, fs_1.readFileSync)(dbpath, { encoding: 'utf-8' }));
        res.render('index_customers', {
            title: 'CUSTOMER RELASHIONSHIP MANAGEMENT SYSTEM',
            customers: data
        });
        key.push(1);
    }
    else {
        res.render('incorrect_login');
    }
});
router.post('/register', function (req, res, next) {
    var file = fs_1.default.readFileSync(dbpath2, { encoding: 'utf8', flag: 'r' });
    var readData = JSON.parse(file);
    var _a = req.body, username = _a.username, email = _a.email, password1 = _a.password1, password2 = _a.password2;
    if (password1 === password2) {
        var user = {
            id: Date.now().toString(),
            username: username,
            email: email,
            password: password1
        };
        var regData = readData.find(function (value) { return value.username === username && value.email === email; });
        if (!regData) {
            readData.push(user);
            fs_1.default.writeFileSync(dbpath2, JSON.stringify(readData, null, 4));
            res.redirect('/login');
        }
        else
            res.render('user_exist');
    }
    else
        res.render('password_mismatch');
});
router.get('/add', function (req, res, next) {
    res.render('add_customer', {
        title: 'CUSTOMER RELASHIONSHIP MANAGEMENT SYSTEM'
    });
});
router.post('/save', function (req, res, next) {
    var file = fs_1.default.readFileSync(dbpath, { encoding: 'utf8', flag: 'r' });
    var readData = JSON.parse(file);
    var _a = req.body, fullname = _a.fullname, email = _a.email, gender = _a.gender, phone = _a.phone, address = _a.address, notes = _a.notes;
    var customer = {
        customerid: parseInt(Date.now().toString()),
        fullname: fullname,
        email: email,
        gender: gender,
        phone: phone,
        address: address,
        notes: notes
    };
    readData.push(customer);
    fs_1.default.writeFileSync(dbpath, JSON.stringify(readData, null, 4));
    res.status(201);
    res.redirect('/');
    key.push(1);
});
router.get('/edit/:id', function (req, res, next) {
    var data = JSON.parse((0, fs_1.readFileSync)(dbpath, { encoding: 'utf-8' }));
    var customerData = data.find(function (value) { return value.customerid === parseInt(req.params.id); });
    res.render('update_customer', {
        title: 'CUSTOMER RELASHIONSHIP MANAGEMENT SYSTEM',
        customer: customerData
    });
});
router.post('/update', function (req, res, next) {
    var file = fs_1.default.readFileSync(dbpath, { encoding: 'utf8', flag: 'r' });
    var readData = JSON.parse(file);
    var customer = readData.find(function (value) { return value.customerid === parseInt(req.body.id); });
    if (!customer)
        return res.status(404).send("Customer not found!");
    var _a = req.body, fullname = _a.fullname, email = _a.email, gender = _a.gender, phone = _a.phone, address = _a.address, notes = _a.notes;
    customer.fullname = fullname ? fullname : customer.fullname,
        customer.email = email ? email : customer.email,
        customer.gender = gender ? gender : customer.gender,
        customer.phone = phone ? phone : customer.phone,
        customer.address = address ? address : customer.addres,
        customer.notes = notes ? notes : customer.notes;
    fs_1.default.writeFileSync(dbpath, JSON.stringify(readData, null, 4));
    res.status(202);
    res.redirect('/');
    key.push(1);
});
router.get('/delete/:id', function (req, res, next) {
    var file = fs_1.default.readFileSync(dbpath, { encoding: 'utf8', flag: 'r' });
    var readData = JSON.parse(file);
    var customer = readData.find(function (value) { return value.customerid === parseInt(req.params.id); });
    console.log(typeof req.params.id);
    if (!customer)
        return res.status(404).send('Customer not found!');
    var index = readData.indexOf(customer);
    readData.splice(index, 1);
    fs_1.default.writeFileSync(dbpath, JSON.stringify(readData, null, 4));
    res.status(200);
    res.redirect('/');
    key.push(1);
});
exports.default = router;
