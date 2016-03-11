(function(){
    
    var Book    = require('./book.model');
    var request = require("request");
    var async   = require("async");
    var moment  = require("moment");
    
    module.exports.mybooks = function(req, res) {
        Book.find({ $or: [{ owner: req.user.email }, { tradeTo: req.user.email }] }, function(err, books) {
           if (err) res.status(500).send(err);
           else {
               var data = { my: [], trades: [] };
               books.forEach(b => {
                  if (b.owner == req.user.email) data.my.push(b);
                  else data.trades.push(b); 
               });
               res.json(data);
           }
        });
    };
    
    module.exports.otherbooks = function(req, res) {
        Book.find({ owner: { $ne: req.user.email }}, function(err, books) {
           if (err) res.status(500).send(err);
           else res.json(books);
        });
    };
    
    module.exports.create = function(req, res) {
        console.log("Add book to library: " + req.params.book);
        var book = new Book({ 
            googleid: req.body.googleid,
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
