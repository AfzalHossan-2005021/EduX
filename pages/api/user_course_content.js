const oracledb = require('oracledb');
import pool from "../../middleware/connectdb"


export default async function handler(req, res) {
    if (req.method == 'POST') {
        const connection = await pool.acquire();
        const { s_id, c_id } = req.body;
        try {
            const result = await connection.execute(
                `BEGIN
                    USER_COURSE_CONTENT(:student_id, :course_id);
                  END;`,
                { 
                    student_id: s_id,
                    course_id: c_id 
                },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            res.status(200).json(result.implicitResults);
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