import React from "react";
import BreadCrumbsSec from "../bread/BreadCrumbsSec";
import landSectionOneJson from "./sectionsData.json";
const LandSectionOne = () => {
  const rubikSvg = "/images/Rubiks_cube.png";
  return (
    <div className="flex center p2">
      <BreadCrumbsSec
        imageSrc={rubikSvg}
        title={landSectionOneJson.title}
        altText={landSectionOneJson.altText}
        text={landSectionOneJson.bodyText}
        btnText={landSectionOneJson.btnText}
      />
    </div>
  );
};

export default LandSectionOne;
