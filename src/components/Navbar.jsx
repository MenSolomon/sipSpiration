import React, { useState, useEffect, useRef } from "react";
import css from "../styles/home.module.css";
import russia from "../assets/images/russia.png";
import riffs from "../assets/images/riffs.png";
import menu from "../assets/images/menu.png";
import banner from "../assets/images/sip.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import google from "../assets/images/google-play.png";
import apple from "../assets/images/apple.png";
import "../styles/animation.css";
import MixModal from "../modals/mixModal";
import { useDispatch } from "react-redux";
import { deliverDrink } from "../slices/sendDrink";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // ** Animate Menu button on mobile devices **
  const [number, setNumber] = useState(1);

  const [slideAnimate, setSlideAnimate] = useState("");

  const slideMenu = () => {
    setNumber(number + 1);
    if (number % 2 == 0) {
      setSlideAnimate(`popUpMenuAnimate`);
    } else {
      setSlideAnimate(``);
    }
  };
  // End of animate menu

  return (
    <div className={`${css.navbar}`}>
      {/* <img src={banner} /> */}
      <div className={css.navIcon}>
        <img className={css.menuImage} src={menu} onClick={slideMenu} />
      </div>
      <div
        className={`${css.popUpMenu}  ${
          number % 2 == 0 ? css.popUpMenuAnimate : css.disappearMenuAnimate
        }`}
        style={{
          visibility: number == 1 ? "hidden" : number % 2 == 0 ? "visible" : "",
        }}
      >
        <ul>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/allDrinks"
          >
            {" "}
            <li>Drinks</li>{" "}
          </Link>
          <li>Ingredients</li>
        </ul>

        <div className={css.newLetterSignUp}>
          <input type="text" placeholder="Search for drinks "></input>
          <button> Search </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
