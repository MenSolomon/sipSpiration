import React, { useState, useEffect, useRef } from "react";
import css from "../styles/home.module.css";
import banner from "../assets/images/sip.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import google from "../assets/images/google-play.png";
import apple from "../assets/images/apple.png";
import "../styles/animation.css";

const Footer = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={`${css.footer} ${css.section}`}>
      <img src={banner} />
      <h2>
        Delicious cocktails you make from stuff you've got around the house.
      </h2>

      <div className={css.button1}>
        <div className={css.button}>
          <div
            className={css.first}
            style={{
              backgroundImage: `url(${apple})`,
              backgroundSize: "cover",
              padding: ".4vh .4vw .4vh .4vw",
            }}
          >
            {/* <img src={apple} />  */}
          </div>
          <div className={css.second}>
            <h4> Coming soon </h4>
          </div>
          <div className={css.third}>
            <h3> App Store </h3>
          </div>
        </div>
      </div>

      <div className={`${css.button1} ${css.button2}`}>
        <div className={css.button}>
          <div
            className={css.first}
            style={{
              backgroundImage: `url(${google})`,
              backgroundSize: "cover",
              padding: ".4vh .4vw .4vh .4vw",
            }}
          ></div>
          <div className={css.second}> Coming soon </div>
          <div className={css.third}> Google Play </div>
        </div>
      </div>

      <ul className={css.footerMenu}>
        <li> Menu </li>
        <li> Drink recipes </li>
        <li> Ingredients </li>
      </ul>

      <ul className={css.footerNewsLetter}>
        <li> NewsLetter </li>
        <li> Get notified when we add new drinks or release versions </li>
      </ul>

      <div className={css.newLetterSignUp}>
        <input type="text" placeholder="Your e-mail address"></input>
        <button> SignUp </button>
      </div>

      <Carousel
        responsive={responsive}
        className={css.carousels}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={6000}
        // transitionDuration={300}
        // keyBoardControl={true}
        arrows={true}
      >
        <div>
          <h1> Great Drinks-great ap </h1>
          <div></div>
          <p>
            Great cocktail app. Very good list of drinks that actually are well
            made and tasty. I have used other apps that just were overloaded
            with tons of junk drinks. It feels like the creators of this app
            actually enjoyed making the drinks and decided which were good
            enough to add to the list. Really appreciate the perpetual updates
            drinks listing too. Hate paying for things more than once.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Footer;
