import database from '../db/connection.js';

export class Recipe {
  constructor({id, title, description, ingredients, instructions, prep_time, cook_time, servings, user_id}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.prep_time = prep_time;
    this.cook_time = cook_time;
    this.servings = servings;
    this.user_id = user_id;
    this.isFavorite = false;
  }

  async save_new() {
    const result = await database.query('INSERT INTO recipes (title, description, ingredients, instructions, prep_time, cook_time, servings, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', 
                         [this.title, this.description, this.ingredients, this.instructions, this.prep_time, this.cook_time, this.servings, this.user_id]);
    this.id = result.rows[0].id;
  }
  
  async update() {
    const result = await database.query('UPDATE recipes SET title = $2, description = $3, ingredients = $4, instructions = $5, prep_time = $6, cook_time = $7, servings = $8 WHERE id = $1 AND user_id = $9',
                                        [this.id, this.title, this.description, this.ingredients, this.instructions, this.prep_time, this.cook_time, this.servings, this.user_id]);
  }

  async setFavorite(user_id) {
    const result = await database.query('SELECT * FROM favorites WHERE recipe_id = $1 AND user_id = $2', [this.id, user_id]);
    this.isFavorite = result.rows.length;
  }
  
  static async findById(id) {
    const result = await database.query("SELECT * FROM recipes WHERE id = $1", [id]);
    return result.rows[0] ? new Recipe(result.rows[0]) : null;
  }

  static async findByUserId(id, favorites) {
    let result;
    if (favorites) {
      result = await database.query("SELECT recipes.* FROM recipes JOIN favorites ON favorites.recipe_id = recipes.id WHERE favorites.user_id = $1", [id]);
    }
    else {
      result = await database.query("SELECT * FROM recipes WHERE user_id = $1", [id]);
    }
    if (result.rows.length) {
      result.rows.forEach((item, i) => {
        console.log(`user ID recipe ${item.id}`);
      });
    }
    const recipes = [];
    result.rows.forEach((item, i) => {
      recipes.push(new Recipe(item));
    });

    return recipes;
  }

  static async getAll() {
    const result = await database.query("SELECT * FROM recipes", []);
    const recipes = [];
    result.rows.forEach((item, i) => {
      recipes.push(new Recipe(item));
    });

    return recipes;
  }
}
