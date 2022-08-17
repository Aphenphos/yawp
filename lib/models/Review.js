const pool = require('../utils/pool');

class Review {
  id;
  star_rating;
  detail;
  restaurant_id;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.star_rating = row.star_rating;
    this.detail = row.detail;
    this.restaurant_id = row.restaurant_id;
    this.user_id = row.user_id;
  }
  static async delete(id) {
    console.log(id);
    const { rows } = await pool.query(
      'DELETE from restaurants_reviews WHERE id=$1 RETURNING *',
      [id]
    );
    console.log(rows);
    return new Review(rows[0]);
  }
  
  static async newReview({ star_rating, detail, restaurant_id, user_id }) {
    console.log(star_rating, detail, restaurant_id, user_id);
    const { rows } = await pool.query(
      `insert into restaurants_reviews 
      (star_rating, detail, restaurant_id, user_id) values ($1, $2, $3, $4) returning *`,
      [star_rating, detail, restaurant_id, user_id]
    );
    return new Review(rows[0]);
  }
}

module.exports = { Review };

