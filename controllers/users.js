const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('notes', { content: 1, date: 1 });
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return response.status(400).json({
			error: 'username must be unique',
		});
	}

	if (username.length < 2) {
		return response.status(400).json({
			error: 'username most be longer than 2 characters',
		});
	}

	// if (password.length < 6) {
	//   return response.status(400).json({
	// 		error: 'password most be longer than 6 characters',
	// 	});
	// }

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

module.exports = usersRouter;
