export default function get_course_reviews_query(COURSE_ID){
    return(
        `SELECT
            "Users"."name",
            "Feedbacks"."rating",
            "Feedbacks"."review",
            TO_CHAR( "Feedbacks"."date", 'DD Month, YYYY' ) "date"
        FROM
            "Feedbacks"
            JOIN "Users" ON "Feedbacks"."s_id" = "Users"."u_id" 
        WHERE
            "Feedbacks"."c_id" = '${COURSE_ID}' 
        ORDER BY
            "Feedbacks"."rating" DESC
            FETCH FIRST 3 ROWS ONLY`
        );
    }