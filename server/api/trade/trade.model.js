(function(){
    
    var mongoose = require('mongoose');
    var shortid = require("shortid");

    var Trade = mongoose.model("Trade", new mongoose.Schema({ 
        _id: {
            type: String,
            unique: true,
            'default': shortid.generate
        },
        bookid: String,
        askBy: String,
        askTo: String,
        when: { type: Date, default: Date.now },
    }));
        
    module.exports = Trade;
    
}());
