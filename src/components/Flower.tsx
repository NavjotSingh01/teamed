import React from "react";
import FlowerImage from "../assets/images/flower.png";

export const Flower: React.FC = (props: any) => {
  return (
    <div className="img-wrppaer full-img">
      <img src={FlowerImage} className="flower-img" alt="flower" />
    </div>
  );
};
