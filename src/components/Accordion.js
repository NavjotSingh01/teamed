import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/_accordion.scss";

function Accordion(props) {
  const [setActive, setActiveState] = useState(props.active ? "active" : "");
  const [setHeight, setHeightState] = useState("0px");
  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  return (
    <div className="accordion-item">
      <h3
        className={`accordion-title ${setActive}`}
        onClick={toggleAccordion}
        style={{ cursor: "pointer" }}
      >
        {props.title} <span className={"sign"}>{setActive ? "-" : "+"}</span>
      </h3>

      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={`accordion-body ${setActive}`}
      >
        <div className="accordion-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Accordion;
