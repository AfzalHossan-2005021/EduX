const oracledb = require('oracledb');
import pool from '../../middleware/connectdb'

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const connection = await pool.acquire();
    const { email, password } = req.body;
    try {
      const result = await connection.execute(
        `BEGIN
          CHECK_USER(:email, :password, :user_id, :user_name);
        END;`,
        {
          email: email,
          password: password,
          user_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          user_name: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );
      let message = '';
      let success = false;
      const u_id = result.outBinds.user_id;
      const u_name = result.outBinds.user_name;

      if (u_id == -1) {
        message = 'Invalid password';
        success = false;
      } else if (u_id == -2) {
        message = 'User is not registered';
        success = false;
      } else {
        message = 'Valid user';
        success = true;
      }
      res.status(200).json({ success, message, u_id , u_name});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    } finally {
      pool.release(connection);
    }
  } else {
    res.status(400).json({ message: 'This method is not allowed.' });
  }
}
