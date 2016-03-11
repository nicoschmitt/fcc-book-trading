(function(){
    
    var express = require('express');
    var router = express.Router();
    var passport = require("passport");
    
    var controller = require('./book.controller');
  
    router.get('/my', passport.authenticate('oauth-bearer', { session: false }), controller.mybooks);
    router.get('/other', passport.authenticate('oauth-bearer', { session: false }), controller.otherbooks);
    // router.get('/:book', controller.getData);
    router.post('/:book', passport.authenticate('oauth-bearer', { session: false }), controller.create);
    router.put('/:book', passport.authenticate('oauth-bearer', { session: false }), controller.update);
    // router.delete('/:book', controller.remove);

    module.exports = router;
    
}());
