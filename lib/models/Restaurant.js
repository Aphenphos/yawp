const pool = require('../utils/pool');

class Restaurant {
  id;
  name;
  food_type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.food_type = row.food_type;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from Restaurants');
    return rows.map((item) => new Restaurant(item));
  }
}

module.exports = Restaurant;
