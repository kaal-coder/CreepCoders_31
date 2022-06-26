const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['machine made', 'handmade', 'wooden', 'deccor', 'furnishing',]
    },
    quantity: {
        type: Number,
    },
    rating:{
      type:Number,
      max:5,
      min:0
    }


})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
