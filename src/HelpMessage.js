import React from "react";

const HelpMessage = ({ isReady, isInProgress }) => {
  if (isInProgress) {
    return null;
  }

  let helpMessage = "";

  if (!isReady) {
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
    helpMessage = <span>click the button above to start</span>;
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
