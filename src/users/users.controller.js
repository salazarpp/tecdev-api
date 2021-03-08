/**
 * Users controller
 * overrides pre defined and existing properties
 */
const config = require('config.json');
const jwt = require('jsonwebtoken');
var User = require('./users.model');

/**
 * Users controller
 * overrides pre defined and existing properties
 */
exports.test = function (req, res) {
    var response = {
        message: 'Greetings from the users controller!',
        healt: true
    }
    res.send(response);
};

/**
  * Authenticate the user
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @param {function} next The callback to the next program handler
  * @return {Object} res The response object
  */

exports.authenticate = function (req, res, next) {
    const userRecibed = req.body;
    User.find(function (err, user) {
        if (err) return next(err);
        const userFind = user.find(u => u.username === userRecibed.username && u.password === userRecibed.password);
        if (userFind) {
            const token = jwt.sign({ sub: userFind.id }, config.secret);
            const { password, ...userWithoutPassword } = userFind;
            delete userWithoutPassword._doc['password'];
            var authenticatedUser = {
                ...userWithoutPassword._doc,
                token
            }
            res.status(200).json(authenticatedUser);
        } else {
            res.status(401).send('Wrong user or password');
        }
    })
};

/**
  * Show all the users
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
 exports.all_users = function (req, res) {
    User.find(function (err, user) {
        if (err) return next(err);
        user.forEach((u, index) => {
            user[index].password = undefined;
        });
        res.status(200).json(user);
    });
};

/**
  * Show all the pacientes
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
 exports.all_pacientes = function (req, res) {
    User.find(function (err, user) {
        if (err) return next(err);
        var user_array = user.filter(function(obj) {
            obj.password = undefined;
            if(!obj.typeAdmin) {
              return true;
            }
          });
        res.status(200).json(user_array);
    });
};

/**
  * Add a new user
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.user_create = function (req, res) {
    var user = new User(
        {
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            typeAdmin: req.body.typeAdmin,
            phone: req.body.phone,
            address: req.body.address,
            typeAdmin: req.body.typeAdmin ? typeAdmin.body.typeAdmin : false
        }
    );
    user.save(function (err) {
        if (err) {
            res.status(400).json(err);
        }
        res.status(200).json('usuario agregado');
    })
};

/**
  * Show one user
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

/**
  * Update one user
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

/**
  * Delete one user
  * @param {Object} req The request object
  * @param {Object} res The response object
  * @return {Object} res The response object
  */
exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};