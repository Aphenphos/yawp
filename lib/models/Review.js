const pool = require('../utils/pool');

class Review {
  id;
  stars;
  detail;
  restaurant_id;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.stars = row.stars;
    this.detail = row.detail;
    this.restaurant_id = row.restaurant_id;
    this.user_id = row.user_id;
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE from restaurants_reviews WHERE id=$1 RETURNING *',
      [id]
    );
    return new Review(rows[0]);
  }
  
  static async newReview({ stars, detail, restaurant_id, user_id }) {
    const { rows } = await pool.query(
      `insert into restaurants_reviews 
      (stars, detail, restaurant_id, user_id) values ($1, $2, $3, $4) returning *`,
      [stars, detail, restaurant_id, user_id]
    );
    return new Review(rows[0]);
  }
}

module.exports = { Review };

