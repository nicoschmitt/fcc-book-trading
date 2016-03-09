(function(){
    
    var express = require('express');
    var router = express.Router();
    
    var controller = require('./user.controller');
  
    router.post("/", controller.register);
    router.post('/:email', controller.update);
    
    // router.get('/', controller.list);
    // router.get('/:stock', controller.getData);
    // router.delete('/:stock', controller.remove);

    module.exports = router;
    
}());
