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
    const { rows } = await pool.query('select * from restaurants');
    return rows.map((item) => new Restaurant(item));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `select * from restaurants
      inner join restaurants_reviews on restaurants.id = restaurants_reviews.restaurant_id 
      where restaurants.id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Restaurant(rows[0]);
  }
  static async insert({ name, food_type }) {
    const { rows } = await pool.query(
      'insert into restaurants (name, food_type) values ($1, $2) returning *;',
      [name, food_type]
    );
    return new Restaurant(rows[0]);
  }
}

module.exports =  Restaurant ;
