export default function get_course_suggestion_query(s_id){
    return(
        `SELECT DISTINCT
        "Courses"."c_id",
        "Courses"."title",
        "Users"."name" 
    FROM
        "Courses"
        JOIN "Instructors" ON "Courses"."i_id" = "Instructors"."i_id"
        JOIN "Users" ON "Users"."u_id" = "Instructors"."i_id" 
    WHERE
        "Instructors"."i_id" IN (
        SELECT DISTINCT
            "Instructors"."i_id" 
        FROM
            "Enrolls"
            JOIN "Courses" ON "Enrolls"."c_id" = "Courses"."c_id"
            JOIN "Instructors" ON "Courses"."i_id" = "Instructors"."i_id" 
        WHERE
        "Enrolls"."s_id" = '${s_id}' 
        )
        FETCH NEXT 6 ROWS ONLY`
    );
}