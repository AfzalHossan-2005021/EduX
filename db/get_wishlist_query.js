export default function get_wishlist_query(u_id) {
  return `SELECT "c_id", "title"
        FROM "Wishlist" NATURAL JOIN "Courses"
        WHERE "u_id" = '${u_id}'`;
}
