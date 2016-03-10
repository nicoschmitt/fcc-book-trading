(function(){
    
    var Stock   = require('./stock.model');
    var request = require("request");
    var async   = require("async");
    var moment  = require("moment");
    
    module.exports.list = function(req, res) {
        Stock.find(function(err, stocks) {
           if (err) res.status(500).send(err);
           else res.json(stocks);
        });
    };

    module.exports.getData = function(req, res) {
        var stocks = req.params.stock.split("+");
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        
        var fetch = function(q, cb) {
            var url = `https://www.quandl.com/api/v3/datasets/WIKI/${q}/data.json?start_date=${year - 1}-${month}-${date}&end_date=${year}-${month}-${date}&api_key=${process.env.QUANDL_API_KEY}`;
            request(url, (error, response, body) => {
                if (error) cb(error)
                else {
                    var data = JSON.parse(body);
                    
                    var dateidx = data.dataset_data.column_names.indexOf("Date");
                    var dataidx = data.dataset_data.column_names.indexOf("Open");
                    cb(null, {
                       name: q,
                       data: data.dataset_data.data.map(v => { return [
                                   +moment(v[dateidx], "YYYY-MM-DD"),
                                   v[dataidx] 
                               ]}).reverse()
                    });
                }
            });
        }
        
        async.map(stocks, fetch, function(err, results){
            if (err) res.status(500).send(err);
            else res.json(results);
        });
    };
    
    module.exports.create = function(req, res) {
        var stock = req.params.stock;
        console.log("Create " + stock);
        request(`https://www.quandl.com/api/v3/datasets/WIKI/${stock}/metadata.json?api_key=${process.env.QUANDL_API_KEY}`, (error, response, body) => {
            if (error) res.send(500).send(error);
            else if (response.statusCode == 404) {
                res.status(404).send("Invalid stock symbol.");
            } else {
                var data = JSON.parse(body).dataset;
                var name = data.name;
                var idx = name.indexOf(")");
                if (idx > 0 && idx < name.length - 1) name = name.substring(0, idx + 1);
                var stock = new Stock({
                    _id: data.dataset_code,
                    title: name
                });
                stock.save(function(err, doc) {
                   if (err) res.status(500).send(err);
                   else res.json(doc);
                });
            }
        });
    };
    
    module.exports.remove = function(req, res) {
        var stock = req.params.stock;
        console.log("Remove " + stock);
        Stock.findByIdAndRemove(stock, function(err, data){
            if (err) res.status(500).send(err);
            else res.json({status: "ok"});
        });
    };

}());
