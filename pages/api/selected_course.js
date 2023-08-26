const oracledb = require('oracledb');
import pool from "../../middleware/connectdb"
import get_selected_course_query from "@/db/get_selected_course_query";

export default async function selected_course(req, res) {
	const connection = await pool.acquire();
    const title = req.body.title
	try {
		const result = await connection.execute(
            get_selected_course_query(title),
			[],
			{ outFormat: oracledb.OUT_FORMAT_OBJECT }
		);
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	} finally {
		pool.release(connection);
	}
}