export default function get_selected_course_query(c_id){
    return(
        `SELECT "c_id", "title", "student_count", "rating", "description", "name", "subject", "course_count"
        FROM "Courses" LEFT JOIN "Users" on "i_id" = "u_id"
        LEFT JOIN "Instructors" ON "Courses"."i_id" = "Instructors"."i_id"
        WHERE "Courses"."c_id" = '${c_id}'`
    );
}
