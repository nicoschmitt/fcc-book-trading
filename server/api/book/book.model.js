(function(){
    
    var mongoose = require('mongoose');
    var shortid = require("shortid");

    var Book = mongoose.model("Book", new mongoose.Schema({ 
        _id: {
            type: String,
            unique: true,
            'default': shortid.generate
        },
        googleid: String,
        title: String,
        thumbnail: String,
        owner: String,
        tradeOn: Date,
        tradeTo: String
    }));
        
    module.exports = Book;
    
}());
