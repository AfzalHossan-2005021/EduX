const oracledb = require('oracledb');
import pool from "../../middleware/connectdb"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const connection = await pool.acquire();
        const { s_id, e_id, marks } = req.body;
        try {
            const result = await connection.execute(
                `BEGIN
                    SECURE_EXAM(:s_id, :e_id, :marks);
                END;`,
                {
                    s_id: s_id,
                    e_id: e_id,
                    marks: marks
                },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: 'An error occurred.' });
        } finally {
            pool.release(connection);
        }
    }
    else {
        res.status(400).json({ message: 'This method is not allowed.' })
    }
}