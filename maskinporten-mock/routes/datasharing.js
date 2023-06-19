var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/scope/client', function(req, res, next) {
  var client = {
    "client_id": "64067a31-e9a1-48c2-b2e1-989255eaf864",
      "consumer_orgno": "00998877",
    "description": "Description for client",
      "scopes": [ "svv:kjoretoy/kjoretoyopplysninger" ]
  }
  res.send(client);
});

router.get('/client', function(req, res, next) {
  var clients = [{
    "client_id": "64067a31-e9a1-48c2-b2e1-989255eaf864",
    "consumer_orgno": "00998877",
    "description": "Description for client",
    "scopes": [ "svv:kjoretoy/kjoretoyopplysninger" ]
  }, {
    "client_id": "uuid",
    "consumer_orgno": "00998877",
    "description": "Description for second client",
    "scopes": [ "svv:kjoretoy/kjoretoyopplysninger" ]
  }]
  res.send(clients);
});

router.get('/scope/access', function(req, res, next) {
  var scope = ["svv:kjoretoy/kjoretoyopplysninger", "entur:skyss/apc" ]
  res.send(scope);
});

module.exports = router;
