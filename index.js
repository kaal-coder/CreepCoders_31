const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Product = require('./models/product');
const { send } = require('process');

mongoose.connect('mongodb://localhost:27017/hasthKathaDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['machine made', 'handmade', 'wooden', 'deccor', 'furnishing',];

// buyers below
app.get('/buyersInterface', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/buyersPortal', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/buyersPortal', { products, category: 'All' })
    }
})
app.get('/buyersInterface/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/buyersdetail', { product })
})
// buyers above

// shoping options below
app.get("/buyersInterface/products/:id/shopNow", (req, res) => {
    const id = req.params;
    console.log(id)
    const product = Product.findById(id);
    res.render("products/shopNow", { product, categories })
});
// shopping options above/////////////////////////////////////////////////////////
// login logout below   //////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('products/login')
})
app.get('/logout', (req, res) => {
    res.render('products/login')
})
// login logout above  ////////////////////////////////////////////////////////////
// rating below        ////////////////////////////////////////////////////////////
// app.post("/products/buyer/:id",(req,res)=>{
//   const id = req.params;
//   console.log(id+req.body.rating)
//     const product = await Product.findByIdAndUpdate(id, req.body.rating, { runValidators: true, new: true });
// })
// rating above        ////////////////////////////////////////////////////////////
// seller below        ////////////////////////////////////////////////////////////
app.get('/products', async (req, res) => {
    const { category } = req.query;
    console.log(req.query)
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        categories: req.body.category
    });
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
// sellers above


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})
