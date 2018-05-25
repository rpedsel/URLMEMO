var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var base58 = require('./base58.js');

// grab the url model
var Url = require('./models/url');

// redis cache
var cache = require('./cache');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function (req, res) {
  var longUrl = req.body.url;
  var message = req.body.message;
  var shortUrl = '';
  console.log(req.body);

  var newUrl = Url({
    long_url: longUrl,
    message: message
  });

  // save the new link
  newUrl.save(function (err) {
    if (err) {
      console.log(err);
    }

    var link_id = base58.encode(newUrl._id);
    shortUrl = config.webhost + link_id;

    res.send({ 'shortUrl': shortUrl });

    // save new link to redis
    cache.hmset(link_id,
      'long_url', longUrl,
      'message', message,
      function (err, reply) {
        if (err){
          console.log(err);
        }
      });
  });

});

app.get('/all', function (req, res) {

  Url.find({}, function (err, docs) {
    var records = [];

    docs.forEach(function (doc) {
      records.push(doc);
    });

    res.json(records);
  })
})

app.get('/:encoded_id', function (req, res) {

  var base58Id = req.params.encoded_id;

  var id = base58.decode(base58Id);

  // try to get from cache
  cache.hgetall(base58Id, function (err, obj) {
    if (obj){
      // console.log('redis');
      res.json({
        long_url: obj.long_url,
        message: obj.message
      });
    } else {
      // console.log('mongo');
      Url.findOne({ _id: id }, function (err, doc) {
        if (doc) {
          res.json({
            long_url: doc.long_url,
            message: doc.message
          });
          cache.hmset(base58Id,
            'long_url', doc.long_url,
            'message', doc.message,
            function (err, reply) {
              if (err) {
                console.log(err);
              }
            });
        } else {
          // *** change err behavior?? ***
          res.json({
            long_url: null,
            message: null
          });
        }
      });
    }
  });

});

var server = app.listen(3001, function () {
  console.log('Server listening on port 3001');
});
