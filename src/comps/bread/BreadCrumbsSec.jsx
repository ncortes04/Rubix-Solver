import React from "react";

const BreadCrumbsSec = ({ imageSrc, title, text, altText, btnText }) => {
  return (
    <section className="breadCrumbsOne-container">
      <div className="breadCrumbsOne-inner">
        <div className="image-container">
          <img src={imageSrc} alt={altText} />
        </div>
        <div className="text-container">
          <h2>{title}</h2>
          <p>{text}</p>
          <button className="button-one standard">{btnText}</button>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbsSec;
