"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var customers_1 = __importDefault(require("./routes/customers"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(express.static(`${__dirname}/../static/style.css`));
// app.use(express.static(__dirname + '../public'));
app.use(express_1.default.static(path_1.default.resolve('src/public')));
app.use('/', customers_1.default);
app.set('view engine', 'ejs');
app.set('views', "./views");
console.log("./views");
exports.default = app;
