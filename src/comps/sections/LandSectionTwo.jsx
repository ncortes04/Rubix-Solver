import React from "react";
import BreadCrumbsSec from "../bread/BreadCrumbsSec";
import sectionsData from "./sectionsData.json";
const LandSectionTwo = () => {
  const personRubiks = "/images/personWithCube.png";
  return (
    <div className="flex center p2">
      <BreadCrumbsSec
        imageSrc={personRubiks}
        title={sectionsData.sectionTwo.title}
        altText={sectionsData.sectionTwo.altText}
        text={sectionsData.sectionTwo.bodyText}
        btnText={sectionsData.sectionTwo.btnText}
        reversed={true}
      />
    </div>
  );
};

export default LandSectionTwo;
