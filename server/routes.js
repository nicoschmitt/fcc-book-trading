(function(){
    
    var register = function(app) {
      app.use('/api/config', require('./api/config'));
      app.use('/api/user', require('./api/user'));
      app.use('/api/stock', require('./api/stock'));
    };
    
    module.exports.register = register;

}());
