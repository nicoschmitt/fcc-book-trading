(function(){
    
    var express = require('express');
    var router = express.Router();
    
    var controller = require('./book.controller');
  
    router.get('/', controller.list);
    router.get('/:stock', controller.getData);
    router.post('/:stock', controller.create);
    router.delete('/:stock', controller.remove);

    module.exports = router;
    
}());
