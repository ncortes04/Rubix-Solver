import React from "react";

const BreadCrumbsSec = ({
  imageSrc,
  title,
  text,
  altText,
  btnText,
  reversed,
}) => {
  return (
    <section className="breadCrumbsOne-container">
      <div className={"breadCrumbsOne-inner" + (reversed ? " reversed" : "")}>
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
