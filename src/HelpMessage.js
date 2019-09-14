import React from "react";

const HelpMessage = ({ isNaming, isInProgress }) => {
  if (isInProgress) {
    return;
  }

  let helpMessage = "";

  if (isNaming) {
    helpMessage = (
      <span>
        enter <span style={{ textDecoration: "underline" }}>unique</span> player
        names{" "}
        <span style={{ textDecoration: "underline" }}>
          in the order of mission leader succession
        </span>{" "}
        from left to right
      </span>
    );
  } else {
    // Ready to start
    helpMessage = <span>omg ur so ready</span>;
  }

  return (
    <div
      style={{
        paddingTop: "30px",
        fontSize: "13px",
      }}
    >
      {helpMessage}
    </div>
  );
};

export default HelpMessage;
