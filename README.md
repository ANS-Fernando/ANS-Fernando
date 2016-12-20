# Biblio-lourdes (making of)

¿Cumplo los prerequisitos?

## prerequisitos

* [Git](http://git-scm.com/) esto lo tenemos todos
* [Node.js](http://nodejs.org/) (con NPM), y esto, también
* [Bower](http://bower.io/) esto lo tenemos casi seguro
* [Ember CLI](http://ember-cli.com/) para instalarlo de manera global:

$ npm install -g ember-cli

* [PhantomJS](http://phantomjs.org/) lo instalamos después de crear la aplicación

## Instalación

Creo que cumplo los prerequisitos (aunque parece que me falta phantomjs):

$ ember new biblioLourdes
$ cd miCarpetaDePrueba
$ cd biblioLourdes

Ya tenemos la app lista para hacer un commit inicial en git (crearnos un repo, etc)

$ `npm install`
$ bower install

Ya tenemos todas las dependencias y lo necesario para arrancarla

## Viendo la app

$ `ember serve`

Ya la tenemos arrancada en [http://localhost:4200](http://localhost:4200).

### Probando la app

En otro terminal, desde la ruta de nuestra app:

$ `ember test`

Built project successfully. Stored in "/home/xe22372/test/github/biblioLourdes/tmp/core_object-tests_dist-oxnJHt6u.tmp".
not ok 1 Error
    ---
        message: >
            Launcher PhantomJS not found. Not installed?
    ...

1..1
# tests 1
# pass  0
# skip  0
# fail  1
Launcher PhantomJS not found. Not installed?

Instalamos PhantomJS y lanzamos los tests:

$ npm install phantomjs --safe-dev
$ `ember test`

cleaning up...
Built project successfully. Stored in "/home/xe22372/test/github/biblioLourdes/tmp/core_object-tests_dist-JH4yXkRE.tmp".
ok 1 PhantomJS 2.1 - JSHint | app.js: should pass jshint
ok 2 PhantomJS 2.1 - JSHint | helpers/destroy-app.js: should pass jshint
ok 3 PhantomJS 2.1 - JSHint | helpers/module-for-acceptance.js: should pass jshint
ok 4 PhantomJS 2.1 - JSHint | helpers/resolver.js: should pass jshint
ok 5 PhantomJS 2.1 - JSHint | helpers/start-app.js: should pass jshint
ok 6 PhantomJS 2.1 - JSHint | resolver.js: should pass jshint
ok 7 PhantomJS 2.1 - JSHint | router.js: should pass jshint
ok 8 PhantomJS 2.1 - JSHint | test-helper.js: should pass jshint

1..8
# tests 8
# pass  8
# skip  0
# fail  0

# ok

### Generadores de código

$ `ember help generate`

Con esto te dice todo lo que puedes crear con ember.

### Building

* `ember build` (development)
* `ember build --environment production` (production)

# Creando el punto de entrada:

Hasta ahora no hemos modificado nada de código y con la app arrancada vemos una pantalla (splash) de "en construcción"

$ ember g route index

Ahora vemos una pantalla en blanco poque ya tenemos el punto de entrada de la app.

Editamos app/templates/index.hbs y añadimos sin borrar {{outlet}}

'<h1>Los libros de mi niñ@</h1>'

Eso será lo que veamos al entrar en la app.

$ ember g route reader
$ ember g route book

# Añadiendo bootstrap (estilos css)

$ ember install ember-cli-sass
$ ember install ember-cli-bootstrap-sassy

Comprueba en el ./package.json y ./bower.json que se han añadido 2 lineas con las dependencias.

Añade '@import "bootstrap";' al principio del app/styles/app.css.

Renombra el app.css a app.scss a mano o con el comando:
$ mv app/styles/app.css app/styles/app.scss

# Añade lógica con un controlador

$ ember g controller index


# Añade un addon para manejar inputs tipo select

$ ember install ember-power-select
