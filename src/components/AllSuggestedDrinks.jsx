import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDrinksToDeliver } from "../slices/sendDrink";
import drinksCss from "../styles/AllSuggestedDrinks.module.css";
import Pagination from "@mui/material/Pagination";
import MixModal from "../modals/mixModal";
import modalCss from "../styles/DrinkDisplayPage.module.css";
import css from "../styles/home.module.css";
import menu from "../assets/images/menu.png";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AllSuggestedDrinks = () => {
  const selectedDrinks = useSelector(selectDrinksToDeliver);

  console.log("WE ARE HERE", selectedDrinks);

  //PAGINATION SETTINGS
  const [page, setPage] = useState(1);
  const [pageCounter, setPageCounter] = useState(0);

  let length = selectedDrinks.length;
  let pager = length / 10;

  //   setPageCounter(pager) ;
  useEffect(() => {
    if (!Number.isInteger(pager)) {
      setPageCounter(Math.floor(pager + 1));
      console.log("Not page counter");
    } else {
      setPageCounter(pager);
      console.log("Is Page Counter ");
    }
  }, []);

  console.log(pageCounter);
  //   const [page, setPage] = useState();

  const handleChange = (e, p) => {
    console.log(e, p);
    setPage(p);
  };

  function groupArray(selectedDrinks, groupSize) {
    const grouped = {};
    for (let i = 0; i < selectedDrinks.length; i++) {
      const element = selectedDrinks[i];
      const groupNumber = Math.floor(i / groupSize);
      if (groupNumber in grouped) {
        grouped[groupNumber].push(element);
      } else {
        grouped[groupNumber] = [element];
      }
    }
    return grouped;
  }

  const groupedDrinks = groupArray(selectedDrinks, 10);
  console.log("groupEEE", groupedDrinks);
  /////////// END OF PAGINATION SETTINGS

  // ******* MODAL SETTINGS **********
  //************************************* */
  const [isOpen, setIsOpen] = useState(false);

  const [modalDp, setModalDp] = useState(1);

  const setVisible = () => {
    setIsOpen(true);
  };

  const modalStyle = {
    backgroundColor: "black",
    transform: "translate(-50px,-50px)",
    width: "100vw",
    height: "90vh",
    position: "fixed",
    left: "50vw",
    top: "0vh",
    zIndex: "1000",
  };
  // END OF MODAL SETTINGS

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
    <div className={drinksCss.container}>
      <div className={`${drinksCss.navbar}`}>
        <Navbar />
      </div>

      <ul className={drinksCss.tableList}>
        <p>
          {" "}
          You have {selectedDrinks.length} drinks you can make with the
          ingredients you selected{" "}
        </p>

        {groupedDrinks[page - 1]?.map((item) => (
          <li
            className={drinksCss.ul}
            onClick={() => {
              const drinkSelect = () => {
                setModalDp(item.rank - 1);
              };
              drinkSelect();
              setVisible();
            }}
          >
            <div
              className={drinksCss.image}
              style={{
                backgroundImage: `url(${item.strDrinkThumb})`,
                backgroundSize: "cover",
              }}
            ></div>{" "}
            <div className={drinksCss.text}>
              {" "}
              <h3> {item.strDrink} </h3>
              <ul>
                {item.strIngredient1 ? item.strIngredient1 : ""} &nbsp;
                {item.strIngredient2 ? item.strIngredient2 : ""} &nbsp;
                {item.strIngredient3 ? item.strIngredient3 : ""}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {
        // This is a portal for to display clicked drinks
      }

      <MixModal
        style={modalStyle}
        open={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <div className={modalCss.drinkContainer}>
          <div
            className={modalCss.drinkImage}
            style={{
              backgroundImage: `url(${selectedDrinks[modalDp].strDrinkThumb})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className={modalCss.infoArea}>
            <div className={modalCss.drinkSummary}>
              <h1> {selectedDrinks[modalDp].strDrink} </h1>
            </div>
            <div className={modalCss.drinkIngredient}>
              <table>
                <thead>
                  <th>Ingredient</th>
                  <th>Measurement</th>
                </thead>
                <tbody>
                  {selectedDrinks.map((data) => {
                    if (data.rank == modalDp + 1) {
                      const rows = [];
                      for (let x = 1; x < 15; x++) {
                        if (data["strIngredient" + x] != null) {
                          rows.push(
                            <tr>
                              <td>{data["strIngredient" + x]}</td>
                              <td>{data["strMeasure" + x]}</td>
                            </tr>
                          );
                        }
                      }
                      return rows;
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className={modalCss.drinkMethod}>
              <p> {selectedDrinks[modalDp]["strInstructions"]} </p>
            </div>
          </div>

          <div className={modalCss.seeMore}> </div>
        </div>
      </MixModal>

      <div className={drinksCss.pagination}>
        <Pagination
          count={pageCounter}
          color="primary"
          onChange={handleChange}
        />
      </div>

      <div className={` ${drinksCss.footer}`}>
        <Footer />
      </div>
    </div>
  );
};

export default AllSuggestedDrinks;
