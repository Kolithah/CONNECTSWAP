import React from "react";

const requestComponent = () => {
  return (
    <div className="request-component">
      <div className="request-component-background">
       

        <div className="request-component-profession">profession</div>
        <div className="request-component-company">cpompany</div>
        <div className="request-component-scheme">
          <div className="request-component-scheme-requestedBy">mee</div>
          <div className="request-component-scheme-PostedBy">owner</div>
        </div>
      </div>

      <div className="request-component-update">
        <div className="request-component-update-info">
          <div className="request-component-update-type">
            <div className="request-component-update-type-message">message</div>
            <div className="request-component-update-icon">@</div>
          </div>
          <div className="request-component-date">date</div>
        </div>
      </div>
      <div className="request-component-buttons">
        <div className="request-component-button-layout">Accept</div>
        <div className="request-component-button-layout">Decline</div>
      </div>
    </div>
  );
};

export default requestComponent;
