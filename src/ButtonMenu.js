import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonMenu = ({
  inProgress,
  locked,
  onAddPlayer,
  onRemovePlayer,
  onLock,
  onUnlock,
  onReset,
}) => (
  <div>
    {locked ? (
      <span>
        <button onClick={onUnlock}>
          <FontAwesomeIcon icon="lock-open" /> unlock
        </button>
      </span>
    ) : (
      <span>
        <button onClick={onLock}>
          <FontAwesomeIcon icon="lock" /> lock
        </button>
        &nbsp;
        {!inProgress && (
          <span>
            <button onClick={onAddPlayer}>
              <FontAwesomeIcon icon="plus" /> add player
            </button>
            &nbsp;
            <button onClick={onRemovePlayer}>
              <FontAwesomeIcon icon="minus" /> remove player
            </button>
            &nbsp;
          </span>
        )}
        <button onClick={onReset}>
          <FontAwesomeIcon icon="redo" /> reset
        </button>
      </span>
    )}
  </div>
);

export default ButtonMenu;
