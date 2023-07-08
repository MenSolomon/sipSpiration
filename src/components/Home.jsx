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
import {
  deliverCategory,
  deliverDrink,
  deliverAllDrinks,
  deliverAlcoholStats,
} from "../slices/sendDrink";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  //********************************************************************************************* */
  // ****************** BEGINNING OF COCKTAIL DATA EXTRACTION FROM API ***************************
  //********************************************************************************************* */
  //********************************************************************************************* */

  const [cocktailData, setCocktailData] = useState([]);
  let one_Level_Cocktail_Data = [];

  useEffect(() => {
    const fetchData = async () => {
      const firstExtractCocktail = [];

      const fetchPromises = [];

      for (let i = 97; i < 123; i++) {
        try {
          const response = fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${String.fromCharCode(
              i
            )}`
          );

          fetchPromises.push(response);
        } catch (error) {
          // console.log("Error:", error);
        }
      }

      try {
        const responses = await Promise.all(fetchPromises);

        for (const response of responses) {
          const data = await response.json();
          firstExtractCocktail.push(data);
        }

        // console.log(firstExtractCocktail);
        setCocktailData(firstExtractCocktail);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);
  // console.log("big", cocktailData.flat());
  cocktailData.map((data) =>
    data?.drinks !== null
      ? data?.drinks.map((res) => one_Level_Cocktail_Data.push(res))
      : ""
  );
  console.log("Combined Array", one_Level_Cocktail_Data);

  // **************************GENERATING RANDOM COCKTAIL ***************************************
  //**********************************************************************************************

  const [randomCocktail, setRandomCocktail] = useState([]);

  useEffect(() => {
    const fetchRandomCocktail = async () => {
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const data = await response.json();
        setRandomCocktail(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomCocktail();
  }, []);

  // console.log("rand", randomCocktail);
  // ***** END OF COCKTAIL GENERATION *****
  //******************************************/

  // ********** NAMES OF ALL DRINKS ************
  //******************************************* */
  const tempDrinkNames = [];
  cocktailData.map((data) =>
    data.drinks !== null
      ? tempDrinkNames.push(data?.drinks.map((res) => res?.strDrink))
      : ""
  );
  const namesofAllDrinks = [].concat.apply([], tempDrinkNames);
  // console.log("names", namesofAllDrinks);
  // ********** END OF NAMES OF ALL DRINKS ************
  //******************************************* */

  // ********** TOTAL INGREDIENTSThere are 579 ************
  //******************************************* */
  let one_level_ingredients = [];
  let namesOfIngredient = [];
  // EXTRACTING the Names of ingredients from each drink an placing them in an array regardless of duplication
  one_Level_Cocktail_Data.map((data) => {
    if (data != null) {
      for (let i = 0; i <= 15; i++) {
        if (data[`strIngredient${i}`] != null) {
          one_level_ingredients.push(data[`strIngredient${i}`]);
        }
      }
    }
  });

  // namesOfIngredient = [...new Set(one_level_ingredients)];

  //Removing Duplicated Ingredient name without being case sensitive
  namesOfIngredient = one_level_ingredients.filter(
    (value, index, self) =>
      index === self.findIndex((v) => v.toLowerCase() === value.toLowerCase())
  );
  // Sorting data in descending order
  namesOfIngredient = namesOfIngredient.sort();
  // removing any empty string from the array
  namesOfIngredient = namesOfIngredient.filter((value) => value !== "");
  // console.log(namesOfIngredient);

  // ********** NAMES OF ALL CATEGORIES ************
  //******************************************* */
  const tempDrinkCategories = [];
  cocktailData.map((data) =>
    data.drinks !== null
      ? tempDrinkCategories.push(data?.drinks.map((res) => res?.strCategory))
      : ""
  );
  const namesofAllCategories = [].concat.apply([], tempDrinkCategories);

  console.log("ALLLL CATEGORIES", namesofAllCategories);

  //Removing Duplicated Ingredient name without being case sensitive
  let sortedCatNames = namesofAllCategories.filter(
    (value, index, self) =>
      index === self.findIndex((v) => v.toLowerCase() === value.toLowerCase())
  );
  // Sorting data in descending order
  sortedCatNames = sortedCatNames.sort();
  // removing any empty string from the array
  sortedCatNames = sortedCatNames.filter((value) => value !== "");
  console.log(sortedCatNames);

  dispatch(deliverCategory(sortedCatNames));

  dispatch(deliverAllDrinks(one_Level_Cocktail_Data));

  // console.log("names", namesofAllDrinks);
  // ********** END OF NAMES OF ALL CATEGORIES ************
  //******************************************* */

  // **********Extracting Alcohol Status ************
  //******************************************* */
  const tempAlcoholStatus = [];
  cocktailData.map((data) =>
    data.drinks !== null
      ? tempAlcoholStatus.push(data?.drinks.map((res) => res?.strAlcoholic))
      : ""
  );
  const namesofAllAlcoholStatus = [].concat.apply([], tempAlcoholStatus);

  console.log("ALLLL ALCOHOLS", namesofAllAlcoholStatus);

  //Removing Duplicated Ingredient name without being case sensitive
  let sortedAlcStatus = namesofAllAlcoholStatus.filter(
    (value, index, self) =>
      index === self.findIndex((v) => v.toLowerCase() === value.toLowerCase())
  );
  // Sorting data in descending order
  sortedAlcStatus = sortedAlcStatus.sort();
  // removing any empty string from the array
  sortedAlcStatus = sortedAlcStatus.filter((value) => value !== "");
  console.log(sortedAlcStatus);

  dispatch(deliverAlcoholStats(sortedAlcStatus));

  // console.log("names", namesofAllDrinks);
  // ********** END OF  Alcohol Status  ************
  //******************************************* */

  // ************* END OF DATA RETRIEVAL AND GROUPIN ******
  // ********** START OF DRINK DETAILS PAGE *******

  // const startMix = () => {
  //   if (itemValue1 !== "") {
  //     selectedIngredients.push(itemValue1);
  //   }

  //   if (itemValue2 !== "") {
  //     selectedIngredients.push(itemValue2);
  //   }

  //   if (itemValue3 !== "") {
  //     selectedIngredients.push(itemValue3);
  //   }
  //   if (itemValue4 !== "") {
  //     selectedIngredients.push(itemValue4);
  //   }
  //   if (itemValue5 !== "") {
  //     selectedIngredients.push(itemValue5);
  //   }
  //   if (itemValue6 !== "") {
  //     selectedIngredients.push(itemValue6);
  //   }

  //   // console.log(selectedIngredients[0].replace(/\s+/g, "") + "SSSAS");

  //   // The code below in a the logic the mix generator
  //   // HOW it works
  //   // Each select ingredient in the array (selectedIngredients) is iterated through the coctailData array
  //   // which contains every drink with each ingredient...
  //   // The ingredient is the compared with the first 6 ingredients if there is a match
  //   // the that particular drink is suggested
  //   // However the order of suggesstion depends on which the cocktail with the most ingredient match
  //   for (let i = 0; i <= selectedIngredients.length; i++) {
  //     cocktailData.map((data) =>
  //       data?.drinks === null
  //         ? ""
  //         : data?.drinks.map((data1, index) => {
  //             if (
  //               String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //               String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient2)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //               String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient3)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //               String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient4)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //               String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient5)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //               String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient6).toLowerCase().replace(/\s+/g, "")
  //             ) {
  //               // const newItems = [...option6];

  //               // newItems.push({
  //               //   drinkName: data1.strDrink,
  //               //   instructions: data1.strInstructions,
  //               //   ingredient1: data1.strIngredient1,
  //               //   ingredient2: data1.strIngredient2,
  //               //   ingredient3: data1.strIngredient3,
  //               //   ingredient4: data1.strIngredient4,
  //               //   ingredient5: data1.strIngredient5,
  //               //   ingredient6: data1.strIngredient6,
  //               //   measure1: data1.strMeasure1,
  //               //   measure2: data1.strMeasure2,
  //               //   measure3: data1.strMeasure3,
  //               //   measure4: data1.strMeasure4,
  //               //   measure5: data1.strMeasure5,
  //               //   measure6: data1.strMeasure6,
  //               // });

  //               // setOption6(newItems);

  //               tempOption6.push({
  //                 drinkName: data1.strDrink,
  //                 instructions: data1.strInstructions,
  //                 ingredient1: data1.strIngredient1,
  //                 ingredient2: data1.strIngredient2,
  //                 ingredient3: data1.strIngredient3,
  //                 ingredient4: data1.strIngredient4,
  //                 ingredient5: data1.strIngredient5,
  //                 ingredient6: data1.strIngredient6,
  //                 measure1: data1.strMeasure1,
  //                 measure2: data1.strMeasure2,
  //                 measure3: data1.strMeasure3,
  //                 measure4: data1.strMeasure4,
  //                 measure5: data1.strMeasure5,
  //                 measure6: data1.strMeasure6,
  //                 drinkImage: data1.strDrinkThumb,
  //               });

  //               console.log(tempOption6);

  //               setOption6(tempOption6);

  //               console.log(
  //                 ` %c *********** 6TH BEST OPTION******** (1 INGREDIENT MATCH) \n  ${index} ) ${
  //                   data1.strIngredient1 !== null &&
  //                   data1.strIngredient1 !== undefined
  //                     ? data1.strIngredient1.toLowerCase()
  //                     : "Ingredient doesnt Exist "
  //                 } -----  ${selectedIngredients[i]
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "")}  \n ${data1.strDrink} \n ${
  //                   data1.strInstructions
  //                 } `,
  //                 "color: RED"
  //               );
  //             }

  //             // CHECKING ANY 2 INGREDIENT MATCH
  //             if (
  //               (String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 1])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, ""))
  //             ) {
  //               tempOption5.push({
  //                 drinkName: data1.strDrink,
  //                 instructions: data1.strInstructions,
  //                 ingredient1: data1.strIngredient1,
  //                 ingredient2: data1.strIngredient2,
  //                 ingredient3: data1.strIngredient3,
  //                 ingredient4: data1.strIngredient4,
  //                 ingredient5: data1.strIngredient5,
  //                 ingredient6: data1.strIngredient6,
  //                 measure1: data1.strMeasure1,
  //                 measure2: data1.strMeasure2,
  //                 measure3: data1.strMeasure3,
  //                 measure4: data1.strMeasure4,
  //                 measure5: data1.strMeasure5,
  //                 measure6: data1.strMeasure6,
  //                 drinkImage: data1.strDrinkThumb,
  //               });

  //               console.log(tempOption5);

  //               setOption5(tempOption5);

  //               console.log(
  //                 `%c ***** 5ND BEST OPTION****** (2 INGREDIENT MATCH) \n  ${index} ) ${
  //                   data1.strIngredient1
  //                 } -----  ${selectedIngredients[i]} and ${
  //                   selectedIngredients[i + 1]
  //                 }   \n ${data1.strDrink} \n ${data1.strInstructions} `,
  //                 "color: blue"
  //               );
  //             }

  //             // CHECKING FOR 3 INGREDIENT MATCH
  //             if (
  //               (String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 1])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 2])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, ""))
  //             ) {
  //               tempOption4.push({
  //                 drinkName: data1.strDrink,
  //                 instructions: data1.strInstructions,
  //                 ingredient1: data1.strIngredient1,
  //                 ingredient2: data1.strIngredient2,
  //                 ingredient3: data1.strIngredient3,
  //                 ingredient4: data1.strIngredient4,
  //                 ingredient5: data1.strIngredient5,
  //                 ingredient6: data1.strIngredient6,
  //                 measure1: data1.strMeasure1,
  //                 measure2: data1.strMeasure2,
  //                 measure3: data1.strMeasure3,
  //                 measure4: data1.strMeasure4,
  //                 measure5: data1.strMeasure5,
  //                 measure6: data1.strMeasure6,
  //                 drinkImage: data1.strDrinkThumb,
  //               });

  //               console.log(tempOption4);

  //               setOption4(tempOption4);

  //               console.log(
  //                 `%c ***** 4th OPTION****** (3 INGREDIENT MATCH) \n  ${index} ) ${
  //                   data1.strIngredient1
  //                 } -----  ${selectedIngredients[i]} and ${
  //                   selectedIngredients[i + 1]
  //                 }   \n ${data1.strDrink} \n ${data1.strInstructions} `,
  //                 "color: green"
  //               );
  //             }

  //             /// CHECKING FOR 4 MATCHING ITEMS IN
  //             if (
  //               (String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 1])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 2])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 3])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, ""))
  //             ) {
  //               tempOption3.push({
  //                 drinkName: data1.strDrink,
  //                 instructions: data1.strInstructions,
  //                 ingredient1: data1.strIngredient1,
  //                 ingredient2: data1.strIngredient2,
  //                 ingredient3: data1.strIngredient3,
  //                 ingredient4: data1.strIngredient4,
  //                 ingredient5: data1.strIngredient5,
  //                 ingredient6: data1.strIngredient6,
  //                 measure1: data1.strMeasure1,
  //                 measure2: data1.strMeasure2,
  //                 measure3: data1.strMeasure3,
  //                 measure4: data1.strMeasure4,
  //                 measure5: data1.strMeasure5,
  //                 measure6: data1.strMeasure6,
  //                 drinkImage: data1.strDrinkThumb,
  //               });

  //               console.log(tempOption3);

  //               setOption3(tempOption3);

  //               console.log(
  //                 `%c ***** THE 3RD BEST OPTION (4 Ingredient Match) ****** \n  ${index} ) ${
  //                   data1.strIngredient1
  //                 } -----  ${selectedIngredients[i]} and ${
  //                   selectedIngredients[i + 1]
  //                 }   \n ${data1.strDrink} \n ${data1.strInstructions} `,
  //                 "color: yellow"
  //               );
  //             }

  //             /// search FOR 6
  //             if (
  //               (String(selectedIngredients[i])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 1])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 1])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 2])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 2])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               (String(selectedIngredients[i + 3])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 3])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               ////5
  //               (String(selectedIngredients[i + 4])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 4])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 4])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 4])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 4])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 4])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "")) &&
  //               ////6
  //               (String(selectedIngredients[i + 5])
  //                 .toLowerCase()
  //                 .replace(/\s+/g, "") ===
  //                 String(data1.strIngredient1)
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 5])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient2)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 5])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient3)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 5])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient4)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 5])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient5)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, "") ||
  //                 String(selectedIngredients[i + 5])
  //                   .toLowerCase()
  //                   .replace(/\s+/g, "") ===
  //                   String(data1.strIngredient6)
  //                     .toLowerCase()
  //                     .replace(/\s+/g, ""))
  //             ) {
  //               tempOption1.push({
  //                 drinkName: data1.strDrink,
  //                 instructions: data1.strInstructions,
  //                 ingredient1: data1.strIngredient1,
  //                 ingredient2: data1.strIngredient2,
  //                 ingredient3: data1.strIngredient3,
  //                 ingredient4: data1.strIngredient4,
  //                 ingredient5: data1.strIngredient5,
  //                 ingredient6: data1.strIngredient6,
  //                 measure1: data1.strMeasure1,
  //                 measure2: data1.strMeasure2,
  //                 measure3: data1.strMeasure3,
  //                 measure4: data1.strMeasure4,
  //                 measure5: data1.strMeasure5,
  //                 measure6: data1.strMeasure6,
  //                 drinkImage: data1.strDrinkThumb,
  //               });

  //               console.log(tempOption1);

  //               setOption1(tempOption1);

  //               console.log(
  //                 `%c ******** THE  VERY BEST OPTION****** (ALL 5 INGREDIENT MATCH) \n  ${index} ) ${
  //                   data1.strIngredient1
  //                 } -----  ${selectedIngredients[i]} and ${
  //                   selectedIngredients[i + 1]
  //                 }   \n ${data1.strDrink} \n ${data1.strInstructions} `,
  //                 "color: pink"
  //               );
  //             }
  //           })
  //     );
  //   }

  //   // window.location.href = "/mixedDrinks";

  //   // window.location.pathname = "/mixedDrinks";
  // };

  // let finalresults = option1.concat(option3, option4, option5, option6);

  // ALGO TO REMOVE EVERY DUPLICATED VALUE FROM THE COMBINED ARRAY
  // for (let j = 0; j < finalresults.length; j++) {
  //   for (let i = 0; i < finalresults.length; i++) {
  //     if (finalresults[j].drinkName === finalresults[i].drinkName && j !== i) {
  //       finalresults[i] = "";
  //     }
  //   }
  // }
  // finalresults = finalresults.filter((str) => str !== "");

  // console.log(finalresults);

  // ******* MODAL SETTINGS **********
  //************************************* */
  const [isOpen, setIsOpen] = useState(false);

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
    top: "40vh",
    zIndex: "1000",
  };
  // END OF MODAL SETTINGS

  // var selectionArray = [1];

  // const [dynNumb, setDynNumb] = useState(2);

  // const addItem = () => {
  //   setDynNumb(dynNumb + 1);

  //   if (selectionArray.length <= 5) {
  //     selectionArray.push("added");
  //   }

  //   console.log(selectionArray);
  // };

  const [val, setVal] = useState([]);
  const [upVal, setupVal] = useState([]);

  const handleadd = (e, i) => {
    if (val.length < 8) {
      const holder = [...val, []];
      setVal(holder);
    }
  };

  const handleChange = (changeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = changeValue.target.value;
    setVal(inputdata);
    setupVal(inputdata);
  };

  const divRefs = useRef([]);

  const handleDelete = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setupVal(deleteVal);

    const element = divRefs.current[i];
    if (element) {
      // Manipulate the element here
      element.style.display = "none";
    }
  };

  console.log(upVal, "dataaa");
  console.log(one_Level_Cocktail_Data, "cocktail Data");

  const [possibleDrinks, setPossibleDrinks] = useState([]);

  const [dpChk, setDpChk] = useState(0);

  const startMix = () => {
    let matchingCount = 0;
    let matchedDrinks = [];

    one_Level_Cocktail_Data.map((data) => {
      for (let x = 1; x <= 15; x++) {
        for (let i = 0; i < upVal.length; i++) {
          if (
            String(upVal[i]).toLowerCase().replace(/\s+/g, "") ==
            String(data["strIngredient" + x])
              .toLowerCase()
              .replace(/\s+/g, "")
          ) {
            // console.log(data.strDrink, "=", val[i], data["strIngredient" + x]);
            const key = "ingredient" + i;
            matchedDrinks.push({ name: data.strDrink, [key]: upVal[i] });
          }
        }
      }
    });

    // console.log(matchedDrinks);

    // this is used to group all the findings in to an object
    const groupedDrinks = matchedDrinks.reduce((result, drink) => {
      const existingDrink = result.find((d) => d.name === drink.name);

      if (existingDrink) {
        const keys = Object.keys(drink).filter((key) => key !== "name");
        for (const key of keys) {
          existingDrink[key] = drink[key];
        }
      } else {
        result.push(drink);
      }

      return result;
    }, []);

    const newGroupedDrinks = groupedDrinks
      .sort((a, b) => Object.keys(b).length - Object.keys(a).length)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));

    // You can again filter based on the drink with the most ingredient matched

    // console.log(newGroupedDrinks);

    const gotten = one_Level_Cocktail_Data.filter((item) =>
      newGroupedDrinks.some(
        (subsetItem) =>
          subsetItem.name.toLowerCase() === item.strDrink.toLowerCase()
      )
    );

    const updatedGotten = gotten.map((item) => {
      const matchingSubset = newGroupedDrinks.find(
        (subsetItem) =>
          subsetItem.name.toLowerCase() === item.strDrink.toLowerCase()
      );
      return {
        ...item,
        rank: matchingSubset ? matchingSubset.rank : undefined,
      };
    });

    const finalGenerated = updatedGotten.sort((a, b) => a.rank - b.rank);

    setPossibleDrinks(finalGenerated);

    setDpChk(1);
  };

  dispatch(deliverDrink(possibleDrinks));

  if (dpChk == 1) {
    navigate("/mixedDrinks");
    setDpChk(0);
  }

  return (
    <div className={css.container}>
      <Navbar />
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

          <div className={css.centeredButton}>
            <button onClick={setVisible}> Mix Now </button>
          </div>
        </div>

        <MixModal
          style={modalStyle}
          open={isOpen}
          closeModal={() => setIsOpen(false)}

          // altClose={() => (isOpen === true ? setIsOpen(false) : null)}
        >
          <button onClick={() => handleadd()}>Add</button>
          <button onClick={startMix}>Start mix</button>

          <ul
            className={css.ingredientList}
            style={{ listStyleType: "none", display: "flex", flexWrap: "wrap" }}
          >
            {val.map((data, i) => {
              return (
                <li className={i} ref={(el) => (divRefs.current[i] = el)}>
                  <select
                    className={css.select}
                    defaultValue="Select"
                    onChange={(e) => handleChange(e, i)}
                  >
                    {namesOfIngredient.map((data) => (
                      <option value={data}>{data}</option>
                    ))}
                  </select>

                  <button onClick={() => handleDelete(i)}> X </button>
                </li>
              );
            })}
          </ul>
        </MixModal>
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
