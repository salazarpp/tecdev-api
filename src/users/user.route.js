var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var users_controller = require('./users.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', users_controller.all_users);

router.get('/pacientes', users_controller.all_pacientes);

router.post('/authenticate', users_controller.authenticate);

router.get('/test', users_controller.test);

router.post('/create', users_controller.user_create);

router.get('/:id', users_controller.user_details);

router.put('/:id/update', users_controller.user_update);

router.delete('/:id/delete', users_controller.user_delete);


module.exports = router;