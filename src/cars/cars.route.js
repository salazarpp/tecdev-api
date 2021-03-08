var express = require('express');
var router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
var cars_controller = require('./cars.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', cars_controller.all_cars);

router.get('/test', cars_controller.test);

router.get('/counter', cars_controller.counter);

router.post('/create', cars_controller.car_create);

router.get('/:id', cars_controller.car_details);

router.put('/:id/update', cars_controller.car_update);

router.delete('/:id/delete', cars_controller.car_delete);


module.exports = router;