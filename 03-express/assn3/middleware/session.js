import database from '../db/connection.js';

const sessionMiddleware = async (req, res, next) => {
  const result = await database.query(`SELECT * FROM sessions WHERE id = $1`, [req.cookies.session]);
  if (result.rows.length > 0) {
    const userResult = await database.query(`SELECT * FROM users WHERE id = $1`, [result.rows[0].user_id]);
    req.session = req.cookies.session;
    req.user = userResult.rows[0];
  }
  else {
    req.user = undefined;
    req.session = undefined;
  }
  next();
};

export default sessionMiddleware;
