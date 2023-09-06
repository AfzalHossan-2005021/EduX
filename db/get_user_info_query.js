export default function get_user_info_query(USER_ID){
    return(
        `SELECT DISTINCT "Users"."name", "Users"."email", "Users"."reg_date", "Students"."date_of_birth", "Students"."gender", COUNT("Enrolls"."c_id") "course_count"
        FROM "Users" JOIN "Students" ON "Users"."u_id" = "Students"."s_id"
        JOIN "Enrolls" ON "Students"."s_id" = "Enrolls"."s_id"
        WHERE "u_id" = '${USER_ID}' AND "Enrolls"."approve_status" = 'y'
        GROUP BY "Users"."name", "Users"."email", "Users"."reg_date", "Students"."date_of_birth", "Students"."gender"`
    );
}