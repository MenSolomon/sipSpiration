import React from "react";
import css from "../styles/home.module.css";
import russia from "../assets/images/russia.png";
import riffs from "../assets/images/riffs.png";
import menu from "../assets/images/menu.png";
import banner from "../assets/images/sip.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import google from "../assets/images/google-play.png";
import apple from "../assets/images/apple.png";

const Home = () => {
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
    <div className={css.container}>
      <div className={`${css.navbar}`}>
        <div className={css.navIcon}>
          <img src={menu} />
        </div>
      </div>
      <div className={`${css.displayImage} ${css.section}`}> </div>
      <div className={`${css.storyInfo} ${css.section}`}>
        <div className={css.storyIntro}>
          <h1> You know the story </h1>
          <p>
            You just spent an hour Googling for one flippin’ recipe you can
            actually make – something easy, something good, nothing blue.
          </p>
          <br />

          <p>
            <b>But you’ve got bupkis</b>, because you don’t have kumquat juice
            or balsamic-infused peach hair or whatever all these damn Pinterest
            recipes require, and so here you are, slurping halfheartedly on your
            consolation White Russian.*
          </p>
        </div>

        <div className={css.storyImage}>
          <img src={russia} />
        </div>
        <div className={css.storySolution}>
          <h1>Cheer up, buttercup. </h1>

          <p>
            <b>Cocktail Party’s got this.</b>Just tell it what you’ve got, and
            it’ll tell you what you can make. There aren’t any ads, there’s no
            obnoxious social sharing, and entering your stuff is quick and
            painless.
          </p>
          <br />

          <p>
            It’s just you, your booze, and page after page of solid cocktail
            recipes you can actually make, right this very instant.
          </p>
        </div>
      </div>

      <div className={`${css.drinkShowcase} ${css.section}`}> </div>

      <div className={`${css.blogPage} ${css.section}`}>
        <div>
          <h5>FROM THE BLOG</h5>
          <br /> <br />
          <h1>Our Favourite Manhattan Riffs</h1>
          <img src={riffs} />
          <br />
          <br />
          <p>
            The Manhattan is a time-worn classic, and over all those years it's
            become the inspiration for generations of riffs, twists, and
            re-imaginings. Read on for a selection of our favorites!
          </p>
        </div>
        <div>
          <button> Keep Reading </button>
        </div>
      </div>

      <div className={`${css.reviewPage} ${css.section}`}>
        <Carousel
          responsive={responsive}
          className={css.carousel}
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
              Great cocktail app. Very good list of drinks that actually are
              well made and tasty. I have used other apps that just were
              overloaded with tons of junk drinks. It feels like the creators of
              this app actually enjoyed making the drinks and decided which were
              good enough to add to the list. Really appreciate the perpetual
              updates drinks listing too. Hate paying for things more than once.
            </p>
          </div>
        </Carousel>
      </div>

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
              Great cocktail app. Very good list of drinks that actually are
              well made and tasty. I have used other apps that just were
              overloaded with tons of junk drinks. It feels like the creators of
              this app actually enjoyed making the drinks and decided which were
              good enough to add to the list. Really appreciate the perpetual
              updates drinks listing too. Hate paying for things more than once.
            </p>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
