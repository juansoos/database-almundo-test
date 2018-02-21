const test = require('ava');
const mongoDBServer = require('mongomem').MongoDBServer;
const Db = require('../lib');
const fixtures = require('./fixtures');

test.before('Start server', async () => {
  await mongoDBServer.start();
});
test.beforeEach('Setup database', async (t) => {
  const connectionString = await mongoDBServer.getConnectionString();
  const data = connectionString.split('/');
  const database = {
    host: data[2].split(':')[0],
    port: data[2].split(':')[1],
    db: data[3],
    prod: false,
  };
  const db = new Db(database);
  await db.connect();
  t.context.db = db;
  t.true(db.connected, 'Should be connected');
});
test.afterEach.always('Cleanup database', async (t) => {
  const { db } = t.context;
  await db.disconnect();
  t.false(db.connected, 'Should be disconnected');
  mongoDBServer.tearDown();
});
test('Create hotel', async (t) => {
  const { db } = t.context;
  t.is(typeof db.createHotel, 'function', 'createHotel is a function');
  const hotel = fixtures.getHotel();
  const hotelCreated = await db.createHotel(hotel);
  t.is(hotelCreated.name, hotel.name);
  t.is(hotelCreated.price, hotel.price);
  t.is(hotelCreated.stars, hotel.stars);
  t.is(typeof hotelCreated._id, 'string');
  await t.throws(db.createHotel(), /error creating hotel/);
});
test('Get hotel', async (t) => {
  const { db } = t.context;
  t.is(typeof db.getHotel, 'function', 'getHotel is a function');
  const hotel = fixtures.getHotel();
  const hotelCreated = await db.createHotel(hotel);
  const hotelFind = await db.getHotel(hotelCreated._id);
  t.is(hotelFind.name, hotelCreated.name);
  t.is(hotelFind.price, hotelCreated.price);
  t.is(hotelFind.stars, hotelCreated.stars);
  t.is(typeof hotelFind._id, 'string');
  await t.throws(db.getHotel(12), /hotel not found/);
  await t.throws(db.getHotel(), /hotel not found/);
});
test('Update hotel', async (t) => {
  const { db } = t.context;
  t.is(typeof db.updateHotel, 'function', 'updateHotel is a function');
  const hotel = fixtures.getHotel();
  const hotelCreated = await db.createHotel(hotel);
  const newHotel = {
    name: 'Hotel Stefano',
    price: 5200,
    stars: 4,
  };
  const hotelUpdated = await db.updateHotel(hotelCreated._id, newHotel);
  t.is(hotelUpdated.name, newHotel.name);
  t.is(hotelUpdated.price, newHotel.price);
  t.is(hotelUpdated.stars, newHotel.stars);
  t.is(typeof hotelUpdated._id, 'string');
  await t.throws(db.updateHotel(21), /error updating hotel/);
});
test('Delete hotel', async (t) => {
  const { db } = t.context;
  t.is(typeof db.deleteHotel, 'function', 'deleteHotel is a function');
  const hotel = fixtures.getHotel();
  const hotelCreated = await db.createHotel(hotel);
  const hotelDeleted = await db.deleteHotel(hotelCreated._id);
  t.true(hotelDeleted);
  await t.throws(db.deleteHotel('dasdafsd'), /error deleting hotel/);
});
