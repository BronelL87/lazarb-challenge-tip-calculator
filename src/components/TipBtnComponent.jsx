import React from "react";

const TipBtnComponent = ({ percentage, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(percentage)}
      className={`py-2 rounded-md font-bold text-xl ${
        isSelected 
          ? "bg-[#26C0AB] text-[#00494D]" 
          : "bg-[#00494D] text-white hover:bg-[#9fe8df] hover:text-[#00494D]"
      }`}>
      {percentage}%
    </button>
  );
};

export default TipBtnComponent;
