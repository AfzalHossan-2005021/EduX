import { AiOutlineCloseCircle } from "react-icons/ai";

const Wishlist = ({ wishlistCourses, onRemoveCourse, WishListRef }) => {
  return (
    <div className="relative flex-col hidden md:order-2 pt-2" ref={WishListRef}>
      <div
        className="z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        id="wishlist-dropdown"
      >
        <ul className="p-2" aria-labelledby="user-menu-button">
          {wishlistCourses.map((course) => (
            <li key={course.c_id}>
              <div className="flex flex-row hover:bg-gray-200">
                <a
                  href={`/courses/${course.c_id}`}
                  className="block px-2 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white"
                >
                  {course.title}
                </a>
                <button className="ml-auto justify-between px-2" onClick={() => onRemoveCourse(course.c_id)}>
                  <AiOutlineCloseCircle />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wishlist;
