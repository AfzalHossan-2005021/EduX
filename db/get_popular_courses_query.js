const get_popular_courses =
    `SELECT "c1"."c_id", "c1"."title", "c1"."student_count", COUNT("c2"."c_id")+1 "rank"
    FROM "Courses" "c1" LEFT OUTER JOIN "Courses" "c2"
    ON "c1"."student_count" < "c2"."student_count"
    GROUP BY "c1"."c_id", "c1"."title", "c1"."student_count"
    ORDER BY "rank"
    FETCH NEXT 3 ROWS ONLY`
;

export { get_popular_courses };