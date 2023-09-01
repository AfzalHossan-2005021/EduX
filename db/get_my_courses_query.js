export default function get_my_query(myEmail){
    console.log("in getting query");
    return(
        `SELECT "c_id", "i_id", "title", "description", "date", "progress"
        FROM "Courses" NATURAl JOIN "Enrolls" 
        WHERE "Enrolls"."s_id" = ANY(SELECT "u"."u_id" FROM "Users" "u" WHERE "email"='${myEmail}');`
    );
}