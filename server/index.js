const express = require('express');
let app = express();
const getReposByUsername = require('../helpers/github').getReposByUsername;
const save = require('../database/index').save

app.use(express.static(__dirname + '/../client/dist'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post('/repos', (req, res) => {
  var name = req.body.name;

  if (typeof name !== 'string') {
    return res.status(400).send({message: 'Invalid username'})
  } 

  /*console.log(req.name)*/
  getReposByUsername(name, (err, response, body) => {
    if (err) {
      return res.status(500).send(err);
    }
    /*console.log(response);*/
    
    /*console.log(typeof body)*/
    save(JSON.parse(body), (err, data) =>  {
      if (err) return console.log(err);
      res.send(body);
    });
    
  
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});




  

 

