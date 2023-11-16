import { AiOutlineCloseCircle } from "react-icons/ai";

const Wishlist = ({
  wishlistCourses,
  onRemoveCourse,
  WishListRef,
  toggleWishList,
}) => {
  return (
    <div
      ref={WishListRef}
      className="sidebar absolute top-0 right-0 bg bg-emerald-500 p-10 transform transition-transform translate-x-full"
    >
      <h2 className="font-bold text-xl">Wishlist</h2>
      <span
        onClick={toggleWishList}
        className="absolute top-2 right-2 cursor-pointer text-xl"
      >
        <AiOutlineCloseCircle />
      </span>
      <ul>
        {wishlistCourses.map((course) => (
          <li key={course.id}>
            <span>{course.title}</span>
            <button onClick={() => onRemoveCourse(course.id)}>
              <AiOutlineCloseCircle />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
