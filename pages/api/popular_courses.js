const oracledb = require('oracledb');

async function get_popular_courses() {
    const connection = await oracledb.getConnection({
        user: "EDUX",
        password: '2122',
        connectString: "localhost/ORCLPDB"
    });

    const result = await connection.execute(
        `SELECT "c1"."c_id", "c1"."title", "c1"."student_count", COUNT("c2"."c_id")+1 "rank"
        FROM "Courses" "c1" LEFT OUTER JOIN "Courses" "c2"
        ON "c1"."student_count" < "c2"."student_count"
        GROUP BY "c1"."c_id", "c1"."title", "c1"."student_count"
        ORDER BY "rank"
        FETCH NEXT 2 ROWS ONLY`,
        [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    await connection.close();
    return result.rows;
}

export default async function handler(req, res) {
    try {
        const result = await get_popular_courses();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}