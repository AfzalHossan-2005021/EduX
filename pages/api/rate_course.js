const oracledb = require('oracledb');
import pool from "../../middleware/connectdb"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const connection = await pool.acquire();
        const {u_id, c_id, rating, review} = req.body;
        try {
            await connection.execute(
                `BEGIN
                    RATING_CHANGE(:u_id, :c_id, :rating, :review);
                END;`,
                {
                    u_id: u_id,
                    c_id: c_id,
                    rating: rating,
                    review: review
                }
            );
            res.status(200).json({ message: 'Rating submitted successfully.'});
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