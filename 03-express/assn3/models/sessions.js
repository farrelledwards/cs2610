import database from '../db/connection.js';

export default class Session {
  constructor({id, user_id}) {
    this.id = id;
    this.user_id = user_id;
  }
  
  static async findById(id) {
    const result = await database.query("SELECT * FROM sessions WHERE id = $1", [id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }
}
