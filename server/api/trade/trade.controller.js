(function(){
    
    var Trade = require('./trade.model');
    var Book  = require('../book/book.model');
    
    module.exports.mytrades = function(req, res) {
        Trade.find({ $or: [{ askBy: req.user.email }, { askTo: req.user.email }] })
             .populate("book").populate("askBy").populate("askTo")
             .exec(function(err, trades) {
                if (err) res.status(500).send(err);
                else {
                    var data = { toMe: [], byMe: [] };
                    trades.forEach(t => {
                        if (t.askBy._id == req.user.email) data.byMe.push(t);
                        else data.toMe.push(t); 
                    });
                    res.json(data);
                }
        });
    };
    
    module.exports.create = function(req, res) {
        console.log("Add trade for " + req.params.book);

        Trade.findOne({ book: req.params.book, askBy: req.user.email }, function(err, trade) {
            if (err) return res.status(500).send(err);
            if (trade != null) return res.json(trade); 
            
            // no trade exists, create one
            Book.findById(req.params.book, function(err, book){
                if (err) return res.status(500).send(err);
                
                trade = new Trade({ 
                    book: book.id,
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
    
    module.exports.remove = function(req, res) {
        Trade.findByIdAndRemove(req.params.trade, function(err, doc){
            if (err) return res.status(500).send(err);
            else return res.json({ status: "ok" });
        });
    };
    
    module.exports.update = function(req, res) {
        Trade.findById(req.params.trade, function(err, trade){
            if (err) return res.status(500).send(err);
            if (req.params.action == "approve") {
                Book.findOneAndUpdate({ _id: trade.book }, { tradeOn: Date.now(), tradeTo: trade.askBy }, function(err, book) {
                    if (err) return res.status(500).send(err);
                    
                    Trade.findByIdAndRemove(req.params.trade, function(err, doc){
                        if (err) return res.status(500).send(err);
                        else return res.json({ status: "ok" });
                    });
                });
            } else if (req.params.action == "reject") {
                Trade.findByIdAndRemove(req.params.trade, function(err, doc){
                    if (err) return res.status(500).send(err);
                    else return res.json({ status: "ok" });
                });
            } else {
                return res.status(400).send("invalid request");
            }
        })
    };

}());
