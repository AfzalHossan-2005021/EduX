const oracledb = require('oracledb');
import pool from '../../middleware/connectdb'

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const connection = await pool.acquire();
    const { u_id, c_id } = req.body;
    try {
      const result = await connection.execute(
        `BEGIN
            CHECK_BALANCE(:u_id, :c_id, :user_balance, :course_value);
          END;`,
        {
          u_id: u_id,
          c_id: c_id,
          user_balance: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          course_value: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );
      let message = '';
      let success = false;
      const u_balance = result.outBinds.user_balance;
      const c_value = result.outBinds.course_value;

      if (u_balance<c_value) {
        message = 'Do not have sufficient balance';
        success = false;
      }
      else {
        message = 'Valid';
        success = true;
      }
      res.status(200).json({ success, message, u_balance , c_value});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    } finally {
      pool.release(connection);
    }
  } else {
    res.status(400).json({ message: 'This method is not allowed.' });
  }
}
