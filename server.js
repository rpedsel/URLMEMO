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

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'views/index.html'));
// });

function updateRecentPost(longUrl, shortUrl, message) {
  var counter = 1;
  var post = JSON.stringify(
    {
      "long_url": longUrl,
      "message": message,
      "short_url": shortUrl
    });
  // access redis counter for recent (posts) 
  cache.get('counter', function (err, res) {
    if (err) {
      console.log(err);
    } else if (res) {
      counter = +res + 1;
      cache.incr('counter');
    } else {
      cache.set('counter', 1);
    }

    cache.zrank('recent', post, function (err, res) {
      // if post not in cache recent
      if (res == null) {
        cache.zcard('recent', function (err, res) {
          // and that recent length = 10
          if (res > 20) {
            cache.zremrangebyrank('recent', 0, 0);
          }
        })
      }
    })
    cache.zadd("recent", counter, post);
  });
}



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
    } else {
      var link_id = base58.encode(newUrl._id);
      shortUrl = link_id;
      res.send({ 'shortUrl': shortUrl });

      // save new link to redis
      cache.hmset(link_id,
        'long_url', longUrl,
        'message', message,
        function (err, reply) {
          if (err) {
            console.log(err);
          } else {
            updateRecentPost(longUrl, shortUrl, message);
          }
        });
    }
  });

});

app.get('/all', function (req, res) {
  // Url.find({}, function (err, docs) {
  //   var records = [];

  //   docs.forEach(function (doc) {
  //     records.push(doc);
  //   });

  //   res.json(records);
  // })
  cache.zrevrange('recent', 0, -1, function (err, docs) {
    if (docs) {
      var records = [];
      docs.forEach(function (doc) {
        //console.log(JSON.parse(doc));
        records.push(JSON.parse(doc));
      });
      res.json(records);
    }
  });
});

app.get('/api/:encoded_id', function (req, res) {

  var base58Id = req.params.encoded_id;

  var id = base58.decode(base58Id);

  // try to get from cache
  cache.hgetall(base58Id, function (err, obj) {
    if (obj) {
      // console.log('redis');
      res.json({
        long_url: obj.long_url,
        message: obj.message
      });
      updateRecentPost(obj.long_url, config.webhost + '/message/' + base58Id, obj.message);
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
          updateRecentPost(doc.long_url, config.webhost + '/message/' + base58Id, doc.message);
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



var server = app.listen(3001, function () {
  console.log('Server listening on port 3001');
});
