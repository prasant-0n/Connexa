import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      className={`inline-flex items-center md:text-sm text-xs cursor-pointer  ${containerStyles}`}
      type={type || "button"}
      onClick={onClick}
    >
      {title}
      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
