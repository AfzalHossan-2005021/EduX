const oracledb = require('oracledb');

async function connectdb() {

    const connection = await oracledb.getConnection ({
        user          : "EDUX",
        password      : '2122',
        connectString : "Afzal/ORCLPDB"
    });

    const result = await connection.execute(
        `SELECT "c1"."c_id", "c1"."title", "c1"."rating", COUNT("c2"."c_id")+1 "rank"
        FROM "Courses" "c1" LEFT OUTER JOIN "Courses" "c2"
        ON "c1"."rating" < "c2"."rating"
        GROUP BY "c1"."c_id", "c1"."title", "c1"."rating"
        ORDER BY "rank"
        FETCH NEXT 2 ROWS ONLY`,
        [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await connection.close();

    return result.rows;
}

export default connectdb;