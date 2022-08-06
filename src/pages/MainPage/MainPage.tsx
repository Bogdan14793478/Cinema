import React, { useState, useEffect, useRef, useCallback } from "react";

import Card from "../../components/FilmCard/FilmCard";
import Loader from "../../components/Loader/Loader";
import NewNavbar from "../../components/Navbar/NewNavbar";
import SlickSwitcher from "../../components/SlickSwitcher/SlickSwitcher";

import { Data, FilmFromMovieDB } from "../../utils/interface";
import { getMovie } from "../../api/api";

import classes from "./styles.module.css";

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

  const loadMoreMovies = useCallback(
    async (e) => {
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
    ref.current && ref.current.addEventListener("wheel", loadMoreMovies);
    const removeListener = () => {
      ref.current && ref.current.removeEventListener("wheel", loadMoreMovies);
    };
    return () => {
      removeListener();
    };
  }, [loadMoreMovies]);

  return (
    <div className={classes.section}>
      <NewNavbar />
      <div className={classes.container}>
        <SlickSwitcher />
        <div className={classes.cards} ref={ref}>
          {infoAboutFilms ? (
            infoAboutFilms?.map((item: FilmFromMovieDB | Data, index) => {
              return <Card item={item} key={item.id || index} />;
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
