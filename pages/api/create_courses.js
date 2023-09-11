const oracledb = require('oracledb');
import pool from '../../middleware/connectdb'

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const connection = await pool.acquire();
    const { u_id, titlee,description } = req.body;
    try {
      const result = await connection.execute(
        `BEGIN
            CREATE_COURSES(:u_id, :titlee, :description);
          END;`,
        {
          u_id: u_id,
          titlee: titlee,
          description: description,
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );
      let message = 'Valid';
      let success = true;
      res.status(200).json({ success, message});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    } finally {
      pool.release(connection);
    }
  } else {
    res.status(400).json({ message: 'This method is not allowed.' });
  }
}
