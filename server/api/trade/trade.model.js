(function(){
    
    var mongoose = require('mongoose');
    var shortid = require("shortid");
    
    var Trade = mongoose.model("Trade", new mongoose.Schema({ 
        _id: {
            type: String,
            unique: true,
            'default': shortid.generate
        },
        book: { type: String, ref: "Book" },
        askBy: { type: String, ref: "User" },
        askTo: { type: String, ref: "User" },
        when: { type: Date, default: Date.now },
    }));
        
    module.exports = Trade;
    
}());
