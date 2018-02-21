const fixtures = {
  getHotel() {
    return {
      name: 'Hotel París',
      price: 40000,
      stars: 3,
    };
  },
  getHotels(n) {
    const hotels = [];
    while (n-- > 0) {
      hotels.push(this.getHotel);
    }
    return hotels;
  },
};

module.exports = fixtures;
