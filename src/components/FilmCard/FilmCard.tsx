import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { getFromStorage } from "../../utils/helpers";
import { ItemData } from "../../utils/interface";

import classes from "./styles.module.css";

const Card: React.FC<ItemData> = ({ item }) => {
  const [data] = useState(item);
  const [expanded, seteExpanded] = useState(false);

  const handleExpandClick = () => {
    seteExpanded(!expanded);
  };

  const isAuth = getFromStorage("isAuth");
  const adressImg = process.env.REACT_APP_URL_IMG_ADRESS + item.poster_path;

  return (
    <div className={classes.card}>
      <div className={classes.imageCard}>
        <img
          src={!!data.Images ? data.Images[0] : adressImg}
          className={classes.image}
          alt="/"
        />
      </div>
      <p className={classes.cardTitle}>{item.Title || item.title}</p>
      {isAuth ? (
        <>
          <div className={classes.details}>
            <p className={classes.info}>
              {item.Genre || "action"} | {item.Director || "some people"} |{" "}
              {item.Released || item.release_date}
            </p>
            <div className={classes.variantOne}>
              <ExpandMoreIcon onClick={handleExpandClick} />
            </div>
          </div>
          <div className={classes.dynamicPart}>
            {expanded && (
              <div className={classes.mainInfo}>
                <div className={classes.detailsFotViewContent}>
                  <p className={classes.personalInfo}>
                    Director: {item.Director || "some people"}.
                  </p>
                  <p className={classes.personalInfo}>
                    Actors: {item.Actors || "some people"}.
                  </p>
                </div>
                <div className={classes.variantTwo}>
                  <ExpandMoreIcon onClick={handleExpandClick} />
                </div>
              </div>
            )}
            {expanded && (
              <div className={[classes.actionDetails, classes.line].join(" ")}>
                <p className={[classes.info, classes.personalInfo].join(" ")}>
                  imdbRating: {item.imdbRating || item.vote_average}
                </p>
                {Number(item.imdbRating || item.vote_average) < 7 ||
                item.imdbRating === "N/A" ? (
                  <ThumbDownAltIcon />
                ) : (
                  <ThumbUpIcon />
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
