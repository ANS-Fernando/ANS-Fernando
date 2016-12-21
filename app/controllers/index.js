import Ember from 'ember';
const dates = [
	new Date("2016/11/25"),
	new Date("2016/12/02"),
	new Date("2016/12/16"),
	new Date("2016/12/22"),
	new Date("2016/01/13"),
	new Date("2016/01/20"),
	new Date("2016/01/26"),
	new Date("2016/02/03"),
	new Date("2016/02/10"),
	new Date("2016/02/17"),
	new Date("2016/02/24"),
	new Date("2016/03/03"),
	new Date("2016/03/10"),
	new Date("2016/03/17"),
	new Date("2016/03/31"),
	new Date("2016/04/07"),
	new Date("2016/04/21"),
	new Date("2016/04/28"),
	new Date("2016/05/05"),
	new Date("2016/05/12"),
	new Date("2016/05/19"),
	new Date("2016/05/26"),
	new Date("2016/06/02"),
	new Date("2016/06/09")
];

const readers = [
	"Adam",
	"Adriana",
	"Ainara",
	"Alejo",
	"Anna",
	"Aroa",
	"Blanca",
	"Carmen",
	"Chloe",
	"David",
	"Emma",
	"Hugo",
	"Leonardo",
	"Mario",
	"Natalia",
	"Noa",
	"Ona",
	"Paula",
	"Sara",
	"Samuel J.",
	"Samuel P.",
	"Sofía",
	"Valentina",
	"Víctor"
];
const books = [
	"Soy el más guapo",
	"Grandes amigos",
	"¿Qué es un niño?",
	"El país de las pulgas",
	"La oca que no quería marcar el paso",
	"Amigos",
	"Cómo mola tu escoba",
	"Te quiero (casi siempre)",
	"Soy el más fuerte",
	"Pequeño azul y pequeño amigo",
	"El cazo de Lorenzo",
	"Tú y yo, el cuento más bonito del mundo",
	"Una montaña de amigos",
	"El peor cumpleaños de mi vida",
	"La isla del abuelo",
	"La tortuga Taratuga es fea gorda que ...",
	"El sueño de Matías",
	"Un beso antes de desayunar",
	"No me da miedo de ... ",
	"Una pesadilla en mi armario",
	"Quiero dormir",
	"Por cuatro esquinitas de nada",
	"Escarabajo en compañia",
	"Qué bonito es Panamá"
];

export default Ember.Controller.extend({

	now: new Date(),

	numDates: dates.length,

	initDate: Ember.computed(function() {
		return dates[0];
	}),

	endDate: Ember.computed(function() {
		return dates[this.get('numDates') - 1];
	}),

	lastDate: Ember.computed(function() {
		return dates[this.get('numRed') - 1];
	}),

	nextDate: Ember.computed(function() {
		return dates[this.get('numRed')];
	}),

	readers: readers,

	numReaders: readers.length,

	currentReader: Ember.computed(function() {
		return readers[(Math.floor(Math.random() * this.numReaders)) - 1];
	}),

	books: books,

	numBooks: books.length,

	numRed: 2,

	numLeft: Ember.computed(function() {
		return this.numReaders - this.numRed;
	}),

	currentBook: Ember.computed(function() {
		let current = this.get('numRandom');
		const difference = current - this.get('numRed');
		if (difference < 0) {
			current = this.get('numBooks') + difference;
		} else {
			current = current - 2;
		}
		return books[current];
	}),

	numBook: Ember.computed(function() {
		return books.indexOf(this.get('currentBook'));
	}),

	numRandom: Ember.computed(function() {
		return readers.indexOf(this.get('currentReader'));
	}),

	donater: Ember.computed('numRandom', function() {
		if (this.get('numRandom') === 0) {
			return readers[this.numReaders - 1];
		} else {
			return readers[this.get('numRandom') - 1];
		}
	}),

	reciver: Ember.computed('numRandom', function() {
		if (this.get('numRandom') === this.numReaders) {
			return readers[0];
		} else {
			return readers[this.get('numRandom') + 1];
		}
	}),

	onReaderChanged: Ember.observer('currentReader',
		function() {
			const selected = readers.indexOf(this.get('currentReader'));
			const difference = selected - this.get('numRed');
			let current = selected;
			this.set('numRandom', selected);
			if (difference < 0) {
				current = this.get('numBooks') + difference;
			} else {
				current = current - 2;
			}
			this.set('numBook', current);
			this.set('currentBook', books[current]);
		})
});