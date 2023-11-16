const oracledb = require('oracledb');
import pool from '../../middleware/connectdb'

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const connection = await pool.acquire();
    const { u_id, c_id } = req.body;
    try {
      const result = await connection.execute(
        `BEGIN
            CHECK_ACCESS(:u_id, :c_id, :user_access);
          END;`,
        {
          u_id: u_id,
          c_id: c_id,
          user_access: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );
      let message = '';
      let success = false;
      const u_access = result.outBinds.user_access;

      if (u_access<0) {
        message = 'Do not have sufficient balance';
        success = false;
      }
      else {
        message = 'Valid';
        success = true;
      }
      res.status(200).json({ success, message, u_access});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    } finally {
      pool.release(connection);
    }
  } else {
    res.status(400).json({ message: 'This method is not allowed.' });
  }
}
