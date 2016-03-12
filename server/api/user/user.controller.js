(function(){
    
    var User    = require('./user.model');
    
    module.exports.register = function(req, res) {
        console.log("Register " + req.body.email);
        User.findOneAndUpdate({ _id: req.body.email }, { name: req.body.name }, { new: true, upsert: true},
            function(err, result) {
                if (err) res.status(500).send(err);
                else {    
                    res.json(result);    
                } 
        });
    }
    
    module.exports.update = function(req, res) {
        console.log("Update " + req.params.email);
        User.findOneAndUpdate({ _id: req.params.email }, { name: req.body.name, country: req.body.country || "", city: req.body.city || "" }, { new: true, upsert: true},
            function(err, result) {
                if (err) res.status(500).send(err);
                else {    
                    res.json(result);
                } 
        });
    }
    
}());
