/**
 * Visits controller
 * overrides pre defined and existing properties
 */
const config = require('config.json');
var Car = require('./cars.model');
var moment = require('moment');

/**
 * Visits controller
 * overrides pre defined and existing properties
 */
exports.test = function (req, res) {
    var response = {
        message: 'Greetings from the cars controller!',
        healt: true
    }
    res.send(response);
};

/**
  * Show all the cars
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.all_cars = function (req, res) {
    Car.find(function (err, car) {
        if (err) return next(err);
        res.send(car);
    });
};

/**
  * Add a new car
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.car_create = function (req, res) {
    Car.countDocuments().then(counter => { 
        var car = new Car(
            {   
                id: (req.body.carId ? req.body.carId : counter + 1),
                description:  req.body.description,
                make: req.body.make,
                model: req.body.model,
                estimatedate: req.body.estimatedate,
                image: req.body.image,
                km: (req.body.km ? req.body.km : 0),
                estimatedate: req.body.estimatedate ? moment(req.body.estimatedate).format('YYYY-MM-DD HH:mm') : '',
            }
        );
        car.save(function (err) {
        if (err) {
            res.status(400).json(err);
        }
        res.status(200).json('Car agregada');
        })
    });
};

/**
  * Show one car
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.car_details = function (req, res) {
    Car.findById(req.params.id, function (err, car) {
        res.status(200).json(car);
    })
};

/**
  * Update one car
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.car_update = function (req, res) {
    Car.findOneAndReplace({_id: req.params.id}, {$set: req.body}, function (err, car) {
        if (err) {
            // custom application error
            return res.status(400).json({ message: err });
        }
        res.status(200).json({
            r: 'Car udpated.',
            v: car
        });
    });
};

/**
  * Delete one car
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.car_delete = function (req, res) {
    Car.findOneAndDelete(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

/**
  * Show all the cars
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
 exports.counter = function (err, res) {
    Car.countDocuments().then((count) => {
        if (typeof (err) === 'string') {
            // custom application error
            return res.status(400).json({ message: err });
        }
        res.status(200).json({ count: count });
    });
};