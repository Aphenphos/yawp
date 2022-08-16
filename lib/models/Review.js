const pool = require('../utils/pool');

class Review {
  static async delete(id) {
    const { rows } = await pool.query(
      `
          DELETE from restaurants_reviews
          WHERE id = $1
          RETURNING *
        `,
      [id]
    );
    return new Review(rows[0]);
  }
}

module.exports = { Review };
