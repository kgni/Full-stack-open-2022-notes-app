const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI;

console.log(url);

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

mongoose.connect(url);

Note.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});

// .then((result) => {
// 	console.log('connected');

// 	const note = new Note({
// 		content: 'IT GOT KEYS',
// 		date: new Date(),
// 		important: true,
// 	});

// 	return note.save();
// })
// .then(() => {
// 	console.log('note saved!');
// 	return mongoose.connection.close();
// })
// .catch((err) => console.log(err));
