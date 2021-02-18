const express = require('express');

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');

// Create all our routes 

router.get('/', (req, res) => {
	//burger.all means bring all the burger data back
	burger.all(
		// below is the callback for burger.all
		(data) => {
			const hbsObject = {
				burgers: data
			};
			console.log(hbsObject);
			res.render('index', hbsObject);
		}
	);
});

router.post('/api/burgers', (req, res) => {
	burger.create([ 'burger_name', 'eaten' ], [ req.body.burger_name, req.body.eaten ], (result) => {
		// Send back the ID of the new quote
		res.json({ id: result.insertId });
	});
});
// But usually POST used to create/insert data and PUT use to update data.
router.put('/api/burgers/:id', (req, res) => {
	const condition = `id = ${req.params.id}`;

	console.log('condition', condition);

	burger.update(
		{
			eaten: req.body.eaten
		},
		condition,
		(result) => {
			if (result.changedRows === 0) {
				// If no rows were changed, then the ID must not exist, so 404
				return res.status(404).end();
			}
			res.status(200).end();
		}
	);
});

router.delete('/api/burgers/:id', (req, res) => {
	const condition = `id = ${req.params.id}`;

	burger.delete(condition, (result) => {
		if (result.affectedRows === 0) {
			// If no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		}
		res.status(200).end();
	});
});

// Export routes for server.js to use.
module.exports = router;
