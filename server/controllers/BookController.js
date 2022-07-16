const env = require('dotenv');

var books = [
]
exports.getList = (req, res, next) => {
	res.send(books);
};

exports.getOne = (req, res, next) => {
	res.send(books.find(book=>book.id==req.params.id));
};

exports.createOne = (req, res, next) => {
	let newBook = {...req.body};
	if ( newBook.id )
	{
		let index = books.findIndex(book=>book.id==newBook.id);
		books[index] = newBook;
	}
	else
	{
		newBook.id = Date.now();
		books.push(newBook);
	}
	res.send(newBook);
};

exports.delete = (req, res, next) => {
	books = books.filter(book=>req.params.ids.split(',').findIndex(id=>id==book.id)==-1);
	res.send(books);
};



