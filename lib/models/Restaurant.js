const pool = require('../utils/pool');

class Restaurant {
  id;
  name;
  food_type;
  restaurants_reviews;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.food_type = row.food_type;
    this.restaurants_reviews = row.restaurants_reviews;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from restaurants');
    return rows.map((item) => new Restaurant(item));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `select restaurants.*,
      coalesce(
          json_agg(to_jsonb(restaurants_reviews))
          filter (where 
            restaurants.id IS NOT NULL), '[]'
        ) as restaurants_reviews from restaurants
          left join 
          restaurants_reviews on 
          restaurants.id = restaurants_reviews.restaurant_id 
          where restaurants.id = $1
          group by restaurants.id
          `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    console.log(rows[0]);
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

module.exports =  Restaurant;
