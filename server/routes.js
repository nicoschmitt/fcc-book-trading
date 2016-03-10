(function(){
    
    var register = function(app) {
      app.use('/api/config', require('./api/config'));
      app.use('/api/user', require('./api/user'));
      app.use('/api/book', require('./api/book'));
    };
    
    module.exports.register = register;

}());
