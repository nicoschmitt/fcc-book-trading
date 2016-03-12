(function(){
    
    var express = require('express');
    var router = express.Router();
    var passport = require("passport");
    
    var controller = require('./trade.controller');
  
    router.get('/', passport.authenticate('oauth-bearer', { session: false }), controller.mytrades);
    // router.get('/other', passport.authenticate('oauth-bearer', { session: false }), controller.otherbooks);
    // router.get('/:book', controller.getData);
    router.post('/:book', passport.authenticate('oauth-bearer', { session: false }), controller.create);
    // router.put('/:book', passport.authenticate('oauth-bearer', { session: false }), controller.update);
    // router.delete('/:book', controller.remove);

    module.exports = router;
    
}());
