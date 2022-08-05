import React from 'react';
import Slider from "react-slick";

import data from "../../utils/constants.json";

import classes from './styles.module.css'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "0px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", zIndex: "3", left: "0px" }}
            onClick={onClick}
        />
    );
}

const SlickSwitcher = () => {

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className={classes.container}>
            <Slider {...settings}>
                {data.map((item, index) => {
                    return (
                        <div key={index} className={classes.cardImage}>
                            <img
                                src={item.Images[0]}
                                alt="/"
                                className={classes.imgCarousel}
                            />
                            <p className={classes.textCarousel}>
                                {item.Plot.length > 50
                                    ? `${item.Plot.substring(0, 50)}...`
                                    : item.Plot}
                            </p>
                        </div>
                    )
                })}
            </Slider>
        </div>

    );
}

export default SlickSwitcher