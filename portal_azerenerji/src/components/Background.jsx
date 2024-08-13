/** @format */

import React from "react";

const Background = () => {
  const styles = {
    //     *: {
    // 	padding: "0",
    // 	margin: "0",
    // },
    svg: {
      position: "absolute",
      zIndex: "-100",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      display: "block",
      backgroundColor: "#0e4166",
      backgroundImage: "linear-gradient(to bottom, rgba(14, 65, 102, 0.86), #0e4166)",
    },
  };
  return (
    <svg
      style={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0"
      y="0"
      preserveAspectRatio="xMidYMax slice"
      viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="bg">
          <stop offset="0%" stopColor="rgba(130, 158, 249, 0.06)"></stop>
          <stop offset="50%" stopColor="rgba(76, 190, 255, 0.6)"></stop>
          <stop offset="100%" stopColor="rgba(115, 209, 72, 0.2)"></stop>
        </linearGradient>
        <path
          id="wave"
          fill="url(#bg)"
          d="M-363.852 502.589s236.988-41.997 505.475 0 371.981 38.998 575.971 0 293.985-39.278 505.474 5.859 493.475 48.368 716.963-4.995v560.106H-363.852v-560.97z"></path>
      </defs>
      <use opacity="0.3" xlinkHref="#wave">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          calcMode="spline"
          dur="10s"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          keyTimes="0; .5; 1"
          repeatCount="indefinite"
          type="translate"
          values="270 230; -334 180; 270 230"></animateTransform>
      </use>
      <use opacity="0.6" xlinkHref="#wave">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          calcMode="spline"
          dur="8s"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          keyTimes="0; .6; 1"
          repeatCount="indefinite"
          type="translate"
          values="-270 230;243 220;-270 230"></animateTransform>
      </use>
      <use xlinkHref="#wave">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          calcMode="spline"
          dur="6s"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          keyTimes="0; .4; 1"
          repeatCount="indefinite"
          type="translate"
          values="0 230;-140 200;0 230"></animateTransform>
      </use>
    </svg>
  );
};

export default Background;
