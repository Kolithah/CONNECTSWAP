import React from "react";


const schemeComponent = (props) => {



  return (
    <div className="scheme-main">
      <span>
        <div>{props.occupation}</div>
        <div>{props.field}</div>
        <div>{props.location}</div>
      </span>
      <span>
        <div>{props.workingPlace}</div>
        <div>{props.isPublic}</div>
      </span>
      <span className="scheme-options">
        <span>view</span>
        <span>Delete</span>
      </span>
    </div>
  );
};

export default schemeComponent;
