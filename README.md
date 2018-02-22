# Base de datos

Módulo de base de datos utilizando MongoDB para la prueba de Almundo

---
## **Getting Started**
Estas instrucciones le ayudarán a obtener una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y pruebas.

### **Prerequisites**
Se require tener instalado NodeJS, NPM y MongoDB.
* [NodeJS & NPM](https://nodejs.org/es/)
* [MongoDB](https://docs.mongodb.com/getting-started/shell/installation/)

### **Installing**
Primero se require clonar el repositorio

* **SSH** `git clone git@github.com:juansoos/database-almundo-test.git`

* **HTTPS** `git clone https://github.com/juansoos/database-almundo-test.git`

Luego de ello ejecutar `npm install` dentro de la carpeta del proyecto.

---
## **Data structure**
La base de datos presenta una sóla colección llamada `hotels`, a continuación se presenta la estructura.

### **Hotel** - (hotel)
```
  _id: objectID,
  name: String
  stars: Number
  price:	Number
  image:	String
  amenities: Array<String>
```
- - - -
## Functions

El modulo de base de datos tiene las siguientes funciones:

### connect(callback)
Se encarga de establecer la conexión con la base de datos.
### disconnect(callback)
Se encarga de cerrar la sesión con la base de datos.
### createHotel(hotel, callback)
Se encarga de la creación de nuevos hoteles, recibe de parámetro un objeto que contiene los datos del hotel.
### updateHotel(id, hotel, callback)
Se encarga de actualizar un hotel, recibe de parámetros el id del hotel y los nuevos datos.
### deleteHotel(id, callback)
Se encarga de eliminar un hotel, recibe de parámetro el id del hotel.
### getHotels(callback)
Se encarga de obtener los hoteles
### getHotelsByName(name, callback)
Se encarga de obtener los hoteles que coincidan con un nombre, recibe de parámetro un nombre
### getHotelsByStars(stars, callback)
Se encarga de obtener los hoteles que coincidan con el rango de estrellas, recibe de parámetro el número de estrellas
### getHotel(id, callback)
Se encarga de obtener un hotel, recibe de parámetro el id del hotel.

- - - -
## Tests
Las funciones del CRUD de un hotel han sido testeadas usando [ava](https://github.com/avajs/ava)

* Correr `npm test` dentro de la carpeta del proyecto.

---
- - - -
## **Built With**
* [Bluebird](http://bluebirdjs.com/docs/getting-started.html) - Resolución de promesas.
* [Co](https://github.com/tj/co) -  Permite la gestión de llamadas a funciones generadoras y  convertirlas en funciones regulares que devuelve una promesa.
* [Mongodb](https://github.com/mongodb/node-mongodb-native) - Librería para utilizar MongoDB con NodeJS.
---
## **Versioning**
1.0.0
- - - -
## **Authors**
* **Julián Sotelo** - *Initial work* - [juansoos](https://github.com/juansoos)
- - - -
## License
The JavaScript Templates script is released under the [MIT license](https://opensource.org/licenses/MIT).