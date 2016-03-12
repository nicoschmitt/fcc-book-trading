(function(){
    
    var express = require('express');
    var router = express.Router();
    var passport = require("passport");
    
    var controller = require('./trade.controller');
  
    router.get('/', passport.authenticate('oauth-bearer', { session: false }), controller.mytrades);
    router.post('/:book', passport.authenticate('oauth-bearer', { session: false }), controller.create);
    router.put('/:trade/:action', passport.authenticate('oauth-bearer', { session: false }), controller.update);
    router.delete('/:trade', passport.authenticate('oauth-bearer', { session: false }), controller.remove);

    module.exports = router;
    
}());
