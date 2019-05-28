const mongoose = require('mongoose');

const returnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    shipping: { type: String, required: false }
});

module.exports = mongoose.model('Return', returnSchema);