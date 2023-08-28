const get_top_rated_courses =
    `SELECT "c1"."c_id", "c1"."title", "c1"."rating", COUNT("c2"."c_id")+1 "rank"
	FROM "Courses" "c1" LEFT OUTER JOIN "Courses" "c2"
	ON "c1"."rating" < "c2"."rating"
	GROUP BY "c1"."c_id", "c1"."title", "c1"."rating"
	ORDER BY "rank"
	FETCH NEXT 3 ROWS ONLY`
;

export { get_top_rated_courses };