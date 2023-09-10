const oracledb = require('oracledb');
import pool from '../../middleware/connectdb'
import user from '../user';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const connection = await pool.acquire();
    const { u_id, c_id,user_balance,course_value } = req.body;
    console.log(u_id,c_id,user_balance,course_value,'api page');
    try {
      const result = await connection.execute(
        `BEGIN
            PAYMENT(:u_id, :c_id, :user_balance, :course_value);
          END;`,
        {
          u_id: u_id,
          c_id: c_id,
          user_balance: user_balance,
          course_value: course_value,
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );
      let message = 'sdfdsdf';
      let success = true;
      res.status(200).json({ success,message,u_id});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    } finally {
      pool.release(connection);
    }
  } else {
    res.status(400).json({ message: 'This method is not allowed.' });
  }
}
