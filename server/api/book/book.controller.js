(function(){
    
    var Book = require('./book.model');
    
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
        var book = { 
            googleid: req.body.googleid,
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            owner: req.user.email
         };
         Book.findOneAndUpdate({ googleid: req.body.googleid, owner: book.owner }, book, { new: true, upsert: true, setDefaultsOnInsert: true}, function(err, doc) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(doc);
            }
         });
    };
    
    module.exports.update = function(req, res) {
        console.log(req.body.action + " on book " + req.params.book);
        if (req.body.action == "giveback") {
            Book.findByIdAndUpdate(req.params.book, { tradeOne: null, tradeTo: null }, function(err, doc) {
                if (err)  return res.status(500).send(err);
                else res.json(doc);
            });
        } else {
            res.status(400).send("invalid request");
        }
    };

}());
