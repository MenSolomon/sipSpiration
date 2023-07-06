import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDrinksToDeliver } from "../slices/sendDrink";
import { useNavigate } from "react-router-dom";
import drinksCss from "../styles/DrinkDisplayPage.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DisplaySuggestedDrinks = () => {
  const selectedDrinks = useSelector(selectDrinksToDeliver);

  console.log("WE ARE HERE", selectedDrinks);

  const navigate = useNavigate();

  const handleAllPage = () => {
    navigate("/allmixedDrinks");
  };

  return (
    <div className={drinksCss.container}>
      <div className={drinksCss.navbar}>
        {" "}
        <Navbar />{" "}
      </div>

      <div className={drinksCss.drinkContainer}>
        <div
          className={drinksCss.drinkImage}
          style={{
            backgroundImage: `url(${selectedDrinks[0].strDrinkThumb})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className={drinksCss.infoArea}>
          <div className={drinksCss.drinkSummary}>
            <h1> {selectedDrinks[0].strDrink} </h1>
          </div>
          <div className={drinksCss.drinkIngredient}>
            <table>
              <thead>
                <th>Ingredient</th>
                <th>Measurement</th>
              </thead>
              <tbody>
                {selectedDrinks.slice(0, 1).map((data) => {
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
                })}
              </tbody>
            </table>
          </div>
          <div className={drinksCss.drinkMethod}>
            <p> {selectedDrinks[0]["strInstructions"]} </p>
          </div>
        </div>

        <div className={drinksCss.seeMore}>
          {" "}
          <button onClick={handleAllPage}> See more </button>{" "}
        </div>
      </div>

      <div className={drinksCss.footer}>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
};

export default DisplaySuggestedDrinks;
