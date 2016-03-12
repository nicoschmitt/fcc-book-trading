(function(){
    
    var Trade = require('./trade.model');
    var Book  = require('../book/book.model');
    
    module.exports.mytrades = function(req, res) {
        Trade.find({ $or: [{ askBy: req.user.email }, { askTo: req.user.email }] }, function(err, trades) {
           if (err) res.status(500).send(err);
           else {
               var data = { toMe: [], byMe: [] };
               trades.forEach(t => {
                  if (t.askBy == req.user.email) data.byMe.push(t);
                  else data.toMe.push(t); 
               });
               res.json(data);
           }
        });
    };
    
    module.exports.create = function(req, res) {
        console.log("Add trade for " + req.params.book);

        Trade.findOne({ bookid: req.params.book, askBy: req.user.email }, function(err, trade) {
            if (err) return res.status(500).send(err);
            if (trade != null) return res.json(trade); 
            
            // no trade exists, create one
            Book.findById(req.params.book, function(err, book){
                if (err) return res.status(500).send(err);
                
                trade = new Trade({ 
                    bookid: book.id,
                    askBy: req.user.email,
                    askTo: book.owner
                });
                trade.save(function(err){
                    if (err) return res.status(500).send(err);
                    else return res.json(trade);
                })
            });
        });

    };
    
    module.exports.update = function(req, res) {
      res.json({});  
    };

}());
