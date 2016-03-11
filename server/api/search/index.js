(function(){
    
    var express = require('express');
    var router = express.Router();
    var books = require('google-books-search');
    
    var search = function(req, res) {
        var book = req.params.book;
        var options = { key: process.env.GOOGLE_API_KEY };
        books.search(book, function(error, results, apiResponse) {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json(results.map(b => {
                    return {
                        googleid: b.id,
                        title: b.title,
                        thumbnail: (b.thumbnail || "https://books.google.fr/googlebooks/images/no_cover_thumb.gif").replace(/^http\:/, "https\:")
                    };
                }));
            }
        });
    };
    
    router.get('/:book', search);
    
    module.exports = router;
    
}());
