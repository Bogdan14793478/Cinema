import React, { useState, useEffect, useRef, useCallback } from "react";

import Card from "../../components/FilmCard/FilmCard";
import NewNavbar from "../../components/Navbar/NewNavbar";
import SlickSwitcher from "../../components/SlickSwitcher/SlickSwitcher";

import { Data, FilmFromMovieDB, ReqFilmDB } from "../../utils/interface";
import { getMovie } from "../../api/api";

import classes from "./styles.module.css";

// import dataConst from "../../utils/constants.json";

const MainPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [countDistY, setCountY] = useState(1000);
  const [infoAboutFilms, setInfoAboutFilms] = useState<
    FilmFromMovieDB[] | Data[]
  >([]);
  const [counterPage, setCounterPage] = useState<number>(1);

  async function takeDate() {
    const movie = await getMovie(counterPage);
    setInfoAboutFilms([...infoAboutFilms, ...movie.data.results]);
    setCounterPage(counterPage + 1);
  }

  const setBackgroundPosition = useCallback(
    async (e) => {
      if (countDistY > 5000) return;
      if (e.pageY > countDistY) {
        takeDate();
        setCountY(countDistY + 1000);
      }
    },
    [setCountY, countDistY]
  );

  useEffect(() => {
    takeDate();
  }, []);

  useEffect(() => {
    ref.current && ref.current.addEventListener("wheel", setBackgroundPosition);
    const removeListener = () => {
      ref.current &&
        ref.current.removeEventListener("wheel", setBackgroundPosition);
    };
    return () => {
      removeListener();
    };
  }, [setBackgroundPosition]);

  return (
    <div className={classes.section}>
      <NewNavbar />
      <div className={classes.container}>
        <SlickSwitcher />
        <div className={classes.cards} ref={ref}>
          {infoAboutFilms &&
            infoAboutFilms?.map((item: FilmFromMovieDB | Data, index) => {
              return <Card item={item} key={item.id || index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
