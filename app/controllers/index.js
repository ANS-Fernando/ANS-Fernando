import Ember from 'ember';
const dates = [
	new Date("2016/11/25 16:00"),
	new Date("2016/12/02 16:00"),
	new Date("2016/12/16 16:00"),
	new Date("2016/12/22 16:00"),
	new Date("2017/01/13 16:00"),
	new Date("2017/01/20 16:00"),
	new Date("2017/01/26 16:00"),
	new Date("2017/02/03 16:00"),
	new Date("2017/02/10 16:00"),
	new Date("2017/02/17 16:00"),
	new Date("2017/02/24 16:00"),
	new Date("2017/03/03 16:00"),
	new Date("2017/03/10 16:00"),
	new Date("2017/03/17 16:00"),
	new Date("2017/03/31 16:00"),
	new Date("2017/04/07 16:00"),
	new Date("2017/04/21 16:00"),
	new Date("2017/04/28 16:00"),
	new Date("2017/05/05 16:00"),
	new Date("2017/05/12 16:00"),
	new Date("2017/05/19 16:00"),
	new Date("2017/05/26 16:00"),
	new Date("2017/06/02 16:00"),
	new Date("2017/06/09 16:00")
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

	dates: dates,

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

	numRed: Ember.computed('now', 'dates', function() {
		let leidos = 0;
		for (var i = 0; i < this.dates.length; i++) {
			if (this.now > this.dates[i]) {
				leidos++;
			}
		}
		return leidos;
	}),

	numLeft: Ember.computed('now', 'dates', function() {
		let porLeer = 0;
		for (var i = 0; i < this.dates.length; i++) {
			if (this.now < this.dates[i]) {
				porLeer++;
			}
		}
		return porLeer;
	}),

	redPorcentaje: Ember.computed('numRed', 'numBooks',
		function() {
			const currentPercentaje = (this.get('numRed') * 100) / this.get('numBooks');
			return Math.round(currentPercentaje);
		}),

	timePorcentaje: Ember.computed('lastDate', 'nextDate', 'now', function() {
		const currentPercentaje = ((this.get('nextDate') - this.get('now')) * 100) / (this.get('nextDate') - this.get('lastDate'));
		return Math.round(currentPercentaje);
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