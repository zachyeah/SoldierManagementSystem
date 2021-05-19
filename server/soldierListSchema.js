const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SoldierList = new Schema({
    name: String,
    rank: String,
    sex: String,
    startDate: Date,
    phone: Number,
    email: String,
    photoUrl: String,
    superior_id: {type: mongoose.SchemaTypes.ObjectId}
    // subordinates: [String]
});


SoldierList.virtual('subo', {
    localField: '_id',
    foreignField: 'superior_id',
    justOne: false
});


module.exports = mongoose.model('SoldierList', SoldierList);
