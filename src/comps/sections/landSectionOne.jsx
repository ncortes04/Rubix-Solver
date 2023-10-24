import React from "react";
import BreadCrumbsSec from "../bread/BreadCrumbsSec";
import sectionsData from "./sectionsData.json";
const LandSectionOne = () => {
  const rubikSvg = "/images/Rubiks_cube.png";
  return (
    <div className="flex center p2">
      <BreadCrumbsSec
        imageSrc={rubikSvg}
        title={sectionsData.sectionOne.title}
        altText={sectionsData.sectionOne.altText}
        text={sectionsData.sectionOne.bodyText}
        btnText={sectionsData.sectionOne.btnText}
      />
    </div>
  );
};

export default LandSectionOne;
