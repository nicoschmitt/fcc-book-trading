(function(){
    
    var Book    = require('./book.model');
    var request = require("request");
    var async   = require("async");
    var moment  = require("moment");
    
    module.exports.mybooks = function(req, res) {
        Book.find({ owner: req.user.email }, function(err, books) {
           if (err) res.status(500).send(err);
           else res.json(books);
        });
    };
    
    module.exports.otherbooks = function(req, res) {
        Book.find({ owner: { $ne: req.user.email }}, function(err, books) {
           if (err) res.status(500).send(err);
           else res.json(books);
        });
    };
    
    module.exports.create = function(req, res) {
        var book = new Book({ 
            googleid: req.params.book,
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            owner: req.user.email
         });
         book.save(function(err, doc) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(doc);
            }
         });
    };
    
    module.exports.update = function(req, res) {
      res.json({});  
    };

}());
