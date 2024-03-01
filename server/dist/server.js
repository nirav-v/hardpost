import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// modular route imports
import apiRoutes from './routes/index.js';
// import database connection
import sequelize from './config/database.js';
// import models to map to db tables
import { User, Cart, Order, Item } from './models/index.js';
import { webhookMiddleware } from './controllers/webhook.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('clientBuild'));
app.use(cors()); //allow for client side requests without getting CORS error
// app.use(express.static(path.join(__dirname, 'public')));
// // serving files from images folder
// app.use('/images', express.static(path.join(__dirname, 'images')));
// Stripe webhook route - must go before express.json() middleware below to receive body as Buffer
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhookMiddleware);
app.use(express.json()); // needed to send json req.body in post requests
app.use(bodyParser.urlencoded({ extended: true })); // to parse incoming req body
// using modular route files
app.use('/api', apiRoutes);
app.use('*', (req, res, next) => 
// in deployment we send index.html for all additional paths not defined by our express routes
// react router pushes different paths to window url
res.sendFile(path.join(__dirname, 'clientBuild', 'index.html')));
// see available magic methods on User instances based on the model associations we defined
console.log('magic user methods', Object.keys(User.prototype));
console.log('magic cart methods', Cart.prototype);
console.log('magic Order methods', Object.keys(Order.prototype));
console.log('magic Order methods', Object.keys(Item.prototype));
// create db connection before starting up server
sequelize
    .sync({ force: false })
    .then(() => {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
})
    .catch(err => console.log(err));
