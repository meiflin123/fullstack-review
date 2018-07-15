const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('now connected');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String, 
  owner: String,
  url: String


});

let Repo = mongoose.model('Repo', repoSchema);

// var whenAllDone = function() {

// }

let save = (body, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // var counter = 0;

  // var handleSave = function( err, data ) {
  //   if( err ) return callback( err, null );
  //   counter++

  //   if( counter === body.length ) {
  //     callback( null );
  //   }
  // }

  // for (var i = 0; i < body.length; i++) {
  //   var repo = new Repo({name: body[i]['name'], owner: body[i]['owner']['login'], url : body[i]['owner']["html_url"] })
  //   /*body[i]['name'] = new Repo({name: body[i]['name'], owner: body[i]['owner']['login'], url : body[i]['owner']["html_url"] })*/
  //   repo.save(handleSave);
  // }
  console.log('invoked');
  var promises = [];

  for (var i = 0; i < body.length; i++) {
    var repo = new Repo({name: body[i]['name'], owner: body[i]['owner']['login'], url : body[i]['owner']["html_url"] })
    /*repo.save((err, repo) => {console.log(repo)})*/

    promises.push(repo.save());
  }

  Promise
    .all( promises )
    .then(function() {
      callback(null)
    })
    .catch(function( err ) {
      callback(err)
    })

}

module.exports.save = save;