import database from '../db/connection.js';

export async function setSession(userId, req, res) {
  await database.query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);
  const result = await database.query('INSERT INTO sessions (user_id) VALUES ($1) RETURNING id', [userId]);
                                                                                                                         
  res.cookie('session', result.rows[0].id, {
    maxAge: 60 * 1000, // 1 minute in milliseconds
    httpOnly: true,              // Blocks client-side JS access
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    sameSite: 'lax'              // CSRF protection
  });
  req.user = userId;
}
