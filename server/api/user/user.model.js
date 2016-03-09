(function(){
    
    var mongoose = require('mongoose');

    var User = mongoose.model("User", new mongoose.Schema({ 
        _id: {
            type: String,
            unique: true
        },
        name: String,
        country: String,
        city: String
    }));
        
    module.exports = User;
    
}());
