var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/queue', function (req, res, next) {
   database.getQueue(function (rows) {
      var queue = [];
      if (rows.length !== 0) {
         for (var i = 0; i < rows.length; ++i) {
            queue.push({
               User: rows[i].user,
               Message: rows[i].message,
               TimeStamp: rows[i].timestamp
            });
         }
      }
      res.json(queue);
   });
});

module.exports = router;
