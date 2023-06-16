var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/scope/client', function (req, res, next) {
    var client = {
        "client_id": "64067a31-e9a1-48c2-b2e1-989255eaf864",
        "consumer_orgno": "00998877",
        "description": "Description for client",
        "scopes": ["scope1", "scope2"]
    }
    res.send(client);
});

router.get('/client', function (req, res, next) {
    var clients = [{
        "client_id": "64067a31-e9a1-48c2-b2e1-989255eaf864",
        "consumer_orgno": "00998877",
        "description": "Description for client",
        "scopes": ["scope1", "scope2"]
    }, {
        "client_id": "uuid",
        "consumer_orgno": "00998877",
        "description": "Description for second client",
        "scopes": ["scope1"]
    }]
    res.send(clients);
});

// For å registrere tilgang til scope for ny konsument:
router.put('/scope/access', function (req, res, next) {
    /**
     * BODY:
     * {
     *   "consumer_orgno": "<orgno>",
     *   "scope": "<scope>"
     * }
     * */


    // scope ikkje tilhører innlogga bruker sin organisasjon, eller bruker mangler riktig tilgang i Altinn: HTTP/1.1 401 FORBIDDEN
    res.send();
})

router.get('/scope/access', function (req, res, next) {
    var scope = [{
        "name": "pilot:api",
        "active": true,
        "prefix": "pilot",
        "subscope": "api",
        "description": "Gir tilgang til et eksempelapi for å støttet tines mockapI"
        }, {
        "name": "pilot:datasett",
        "active": true,
        "prefix": "pilot",
        "subscope": "datasett",
        "description": "Gir tilgang til et eksempel-skyportenressurs for å støttet tines mockapI"
    }
    ]
    res.send(scope);
})
    ;

    module.exports = router;
