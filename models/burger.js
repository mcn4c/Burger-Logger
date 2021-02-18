const orm = require('../config/orm');

const burger = {
	all(cb) {
		//in order to get a response from burgersController to burger.js need to put callback function in controller
		orm.selectAll('burgers', (res) => cb(res));
	},
	// The variables cols and vals are arrays.
	create(cols, vals, cb) {
		orm.insertOne('burgers', cols, vals, (res) => cb(res));
	},
	update(objColVals, condition, cb) {
		orm.updateOne('burgers', objColVals, condition, (res) => cb(res));
	},
	delete(condition, cb) {
		orm.deleteOne('burgers', condition, (res) => cb(res));
	}
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
