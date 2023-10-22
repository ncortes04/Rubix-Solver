import React from "react";
import LandBanner from "../comps/banners/LandBanner";
import LandSectionOne from "../comps/sections/LandSectionOne";

const Landing = () => {
  return (
    <div className="container">
      <LandBanner />
      <h2 className="article-title">Learn About the Application</h2>
      <LandSectionOne />
    </div>
  );
};

export default Landing;
