import database from '../db/connection.js';

export class Favorite {
  constructor(recipe_id, user_id) {
    this.id = undefined;
    this.recipe_id = recipe_id;
    this.user_id = user_id;
  }

  async saveNew() {
    await database.query('DELETE FROM favorites WHERE recipe_id = $1 AND user_id = $2', [this.recipe_id, this.user_id]);
    const result = await database.query('INSERT INTO favorites (recipe_id, user_id) VALUES ($1, $2) RETURNING id', 
                         [this.recipe_id, this.user_id]);
    this.id = result.rows[0].id;
  }

  static async unfavorite(recipe_id, user_id) {
    await database.query('DELETE FROM favorites WHERE recipe_id = $1 AND user_id = $2', [recipe_id, user_id]);
  }
}
