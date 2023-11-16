import React, { useEffect, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import LogInSignUp from "./LogInSignUp";
import UserDropDown from "./UserDropDown";
import ExploreDropDown from "./ExploreDropDown";
import SearchResultsList from "./SearchResultsList";
import Wishlist from "./Wishlist";

import { BiHeart } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const WishListRef = useRef(null);
  const searchDivRef = useRef();
  const userDropdownRef = useRef();
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [wishlistCourses, setWishlistCourses] = useState([]);

  useEffect(() => {
    if (secureLocalStorage.getItem("u_id")) {
      setisLoggedIn(true);
    }
  }, [isLoggedIn]);

  const toggleWishList = () => {
    if (WishListRef.current.classList.contains("hidden")) {
      WishListRef.current.classList.remove("hidden");
    } else if (!WishListRef.current.classList.contains("hidden")) {
      WishListRef.current.classList.add("hidden");
    }
  };

  const toggleDropdown = () => {
    if (userDropdownRef.current.classList.contains("hidden")) {
      userDropdownRef.current.classList.remove("hidden");
    } else if (!userDropdownRef.current.classList.contains("hidden")) {
      userDropdownRef.current.classList.add("hidden");
    }
  };

  const removeFromWishlist = (courseId) => {
    const u_id = secureLocalStorage.getItem("u_id");
    fetch(`http://localhost:3000/api/remove_from_wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        u_id: u_id,
        c_id: courseId,
      }),
    });
    const updatedWishlist = wishlistCourses.filter((course) => course.c_id !== courseId);
    setWishlistCourses(updatedWishlist);
  };

  useEffect(() => {
    if (secureLocalStorage.getItem("u_id")) {
      setisLoggedIn(true);

      fetch(`http://localhost:3000/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          u_id: secureLocalStorage.getItem("u_id"),
        }),
      })
        .then((Response) => Response.json())
        .then((json) => {
          setWishlistCourses(json);
        });
    }

    fetch("http://localhost:3000/api/all_courses")
      .then((Response) => Response.json())
      .then((json) => {
        setAllCourses(json);
      });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-200 to-slate-400 z-20">
      <div className="flex h-full p-3 space-x-5 justify-between">
        <Logo />
        <ExploreDropDown isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="w-2/5 md:space-y-12" ref={searchDivRef}>
          <SearchBar
            allCourses={allCourses}
            setResults={setResults}
            containerRef={searchDivRef}
          />
          <SearchResultsList results={results} setResults={setResults} />
        </div>
        <div className="flex-col">
          <div className="flex space-x-5 pr-5 items-center justify-end">
            {!isLoggedIn && <LogInSignUp />}
            {isLoggedIn && (
              <div className="flex space-x-5">
                <button>
                  {" "}
                  <BiHeart onClick={toggleWishList} className="text-4xl" />{" "}
                </button>
                <button>
                  {" "}
                  <BsPersonCircle
                    onClick={toggleDropdown}
                    className="text-4xl"
                  />
                </button>
              </div>
            )}
          </div>
          {isLoggedIn && (
            <UserDropDown
              setisLoggedIn={setisLoggedIn}
              userDropdownRef={userDropdownRef}
            />
          )}
          <Wishlist
            wishlistCourses={wishlistCourses}
            onRemoveCourse={removeFromWishlist}
            WishListRef={WishListRef}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
