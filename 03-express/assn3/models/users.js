import database from '../db/connection.js';

export default class User {
  constructor({id, username, email, password_hash}) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
  
  static async findById(id) {
    const result = await database.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }
}
