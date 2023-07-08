import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectAlcoholStatus,
  selectAllDrinksToDeliver,
  selectDrinksToDeliver,
} from "../slices/sendDrink";
import { selectCategoriesToDeliver } from "../slices/sendDrink";
import { useNavigate } from "react-router-dom";
import DrinkCss from "../styles/AllDrinks.module.css";
import drinksCss from "../styles/AllSuggestedDrinks.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Pagination from "@mui/material/Pagination";
import { display } from "@mui/system";
import modalCss from "../styles/DrinkDisplayPage.module.css";
import MixModal from "../modals/mixModal";

const AllDrinks = () => {
  const allCategories = useSelector(selectCategoriesToDeliver);
  const allDrinks = useSelector(selectAllDrinksToDeliver);
  const alcoholStatus = useSelector(selectAlcoholStatus);

  /********  FILTERING SETTINGS   *********************/
  /************************************************** */

  var updatedDrinks = allDrinks.map(function (drink, index) {
    return Object.assign({}, drink, { rank: index + 1 });
  });

  console.log(updatedDrinks, "UUUP");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAlcoholStatus, setSelectedAlcoholStatus] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState(updatedDrinks);
  const [searchFiltered, setSearchFiltered] = useState([]);
  const [filterSelection, setfilterSelection] = useState(["", "", ""]);
  const [srchFil, setSrchFil] = useState(0);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterSelection[0] = e.target.value;
  };

  const handleAlcoholStatusChange = (e) => {
    setSelectedAlcoholStatus(e.target.value);
    filterSelection[1] = e.target.value;
  };

  const handleDrinkSearch = (e) => {
    filterSelection[2] = e.target.value;

    console.log(srchFil);
  };

  const filterDrinks = (checker1, checker2, select1, select2, search) => {
    let filteredDrinkss = [];

    filteredDrinkss = allDrinks.filter((drink, key) => {
      if (select2 != "" && select1 == "") {
        return drink[checker2].toLowerCase() === select2.toLowerCase();
      } else if (select2 == "" && select1 != "") {
        return drink[checker1].toLowerCase() === select1.toLowerCase();
      } else if (select2 != "" && select1 != "") {
        return (
          drink[checker1].toLowerCase() === select1.toLowerCase() &&
          drink[checker2].toLowerCase() === select2.toLowerCase()
        );
      }

      if (search != "") {
        return drink.strDrink.toLowerCase().includes(search.toLowerCase());
      }
    });

    let addedRank = filteredDrinkss.map(function (drink, index) {
      return Object.assign({}, drink, { rank: index + 1 });
    });

    setFilteredDrinks(addedRank);

    console.log("first", filteredDrinks);
    console.log("CH", filterSelection);
  };

  const searchDrinks = (search) => {
    let filteredDrinkss = [];

    filteredDrinkss = allDrinks.filter((drink, key) => {
      if (search != "") {
        return drink.strDrink.toLowerCase().includes(search.toLowerCase());
      }
    });

    filteredDrinkss.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    let addedRank = filteredDrinkss.map(function (drink, index) {
      return Object.assign({}, drink, { rank: index + 1 });
    });

    setFilteredDrinks(addedRank);

    console.log("first", filteredDrinks);
    console.log("CH", filterSelection);
  };

  const [dsp, setDsp] = useState(0);
  const displayFilter = () => {
    if (srchFil == 1) {
      filterDrinks(
        "strCategory",
        "strAlcoholic",
        filterSelection[0],
        filterSelection[1]
      );
    } else if (srchFil == 2) {
      searchDrinks(filterSelection[2]);
    }

    // setSearchFiltered(filteredDrinks);
    // console.log("first", filteredDrinks);
    // console.log("CHH", filterSelection);

    setDsp(1);
  };
  /******** END OF  FILTERING SETTINGS   *********************/
  /************************************************** */

  /******** PAGINATION SETTINGS   *********************/
  /************************************************** */
  const [page, setPage] = useState(1);
  const [pageCounter, setPageCounter] = useState(0);

  let length = filteredDrinks.length;
  let pager = length / 10;

  console.log(length, "lenth");
  //   setPageCounter(pager) ;
  useEffect(() => {
    if (!Number.isInteger(pager)) {
      setPageCounter(Math.floor(pager + 1));
      console.log("Not page counter");
    } else {
      setPageCounter(pager);
      console.log("Is Page Counter ");
    }
  }, [length]);

  console.log(pageCounter, "page counter");
  //   const [page, setPage] = useState();

  const handleChange = (e, p) => {
    console.log(e, p);
    setPage(p);
  };

  function groupArray(filteredDrinks, groupSize) {
    const grouped = {};
    for (let i = 0; i < filteredDrinks.length; i++) {
      const element = filteredDrinks[i];
      const groupNumber = Math.floor(i / groupSize);
      if (groupNumber in grouped) {
        grouped[groupNumber].push(element);
      } else {
        grouped[groupNumber] = [element];
      }
    }
    return grouped;
  }

  const groupedDrinks = groupArray(filteredDrinks, 10);

  console.log("groupEEE", groupedDrinks);
  /////////// END OF PAGINATION SETTINGS

  // ******* MODAL SETTINGS **********
  //************************************* */
  const [isOpen, setIsOpen] = useState(false);

  const [modalDp, setModalDp] = useState(1);

  const setVisible = () => {
    setIsOpen(true);
  };

  // END OF MODAL SETTINGS

  return (
    <div className={DrinkCss.container}>
      <div className={`${DrinkCss.navbar}`}>
        <Navbar />
      </div>

      <div className={`${DrinkCss.infoArea}`}>
        <div className={DrinkCss.filter}>
          <ul>
            <li>Filter &nbsp; </li>

            <li>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                onClick={() => {
                  setSrchFil(1);
                }}
              >
                <option value="">Select</option>
                {allCategories.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </li>

            <li>
              <select
                value={selectedAlcoholStatus}
                onChange={handleAlcoholStatusChange}
                onClick={() => {
                  setSrchFil(1);
                }}
              >
                <option value="">Select</option>
                {alcoholStatus.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>

              <button onClick={displayFilter}>Filter</button>
            </li>
          </ul>

          <ul>
            <li>Search Drinks &nbsp; </li>

            <li>
              <input
                type="text"
                placeholder="Search Drink"
                onChange={handleDrinkSearch}
                onClick={() => {
                  setSrchFil(2);
                }}
              />
              <button onClick={displayFilter}>Search</button>
            </li>
          </ul>
        </div>
        <div className={DrinkCss.render}>
          {/* Display filtered drinks */}
          <ul className={drinksCss.tableList}>
            <p>
              {" "}
              {filteredDrinks.length <= 0 ? (
                <div> No results found </div>
              ) : (
                <div> {filteredDrinks.length} drinks matched </div>
              )}
            </p>

            {groupedDrinks[page - 1]?.map((item) => (
              <li
                className={drinksCss.ul}
                onClick={() => {
                  const drinkSelect = () => {
                    setModalDp(0);
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

          <MixModal open={isOpen} closeModal={() => setIsOpen(false)}>
            <div className={modalCss.drinkContainer}>
              <div
                className={modalCss.drinkImage}
                style={{
                  backgroundImage: `url(${filteredDrinks[modalDp].strDrinkThumb})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className={modalCss.infoArea}>
                <div className={modalCss.drinkSummary}>
                  <h1> {filteredDrinks[modalDp].strDrink} </h1>
                </div>
                <div className={modalCss.drinkIngredient}>
                  <table>
                    <thead>
                      <th>Ingredient</th>
                      <th>Measurement</th>
                    </thead>
                    <tbody>
                      {filteredDrinks.map((data) => {
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
                  <p> {filteredDrinks[modalDp]["strInstructions"]} </p>
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
        </div>
      </div>

      <div className={`${DrinkCss.footer}`}>
        <Footer />
      </div>
    </div>
  );
};

export default AllDrinks;
