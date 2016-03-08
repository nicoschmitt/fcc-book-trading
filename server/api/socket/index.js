(function(){
    
    var Stock = require("../stock/stock.model");
    
    var register = function(io) {
        
        io.on("connection", (socket) => {

            socket.on("stocks", (data) => {
                console.log("Broadcast stock update");

                Stock.find(function(err, stocks) {
                    if (!err) socket.broadcast.emit("stocks", stocks);
                });
            });

        });
        
    };
    
    module.exports.register = register;
    
}());
