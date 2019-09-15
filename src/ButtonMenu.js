import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonMenu = ({
  inProgress,
  isReady,
  locked,
  onAddPlayer,
  onRemovePlayer,
  onLock,
  onUnlock,
  onReset,
  onStart,
}) => (
  <div>
    {locked ? (
      <span>
        <button className="btn" onClick={onUnlock}>
          <FontAwesomeIcon icon="lock-open" /> unlock
        </button>
      </span>
    ) : (
      <span>
        <button className="btn" onClick={onLock}>
          <FontAwesomeIcon icon="lock" /> lock
        </button>
        &nbsp;
        {!inProgress && (
          <span>
            <button className="btn" onClick={onAddPlayer}>
              <FontAwesomeIcon icon="plus" /> add player
            </button>
            &nbsp;
            <button className="btn" onClick={onRemovePlayer}>
              <FontAwesomeIcon icon="minus" /> remove player
            </button>
            &nbsp;
            <button className="btn" disabled={!isReady} onClick={onStart}>
              <FontAwesomeIcon icon="play" /> start
            </button>
            &nbsp;
          </span>
        )}
        <button className="btn" onClick={onReset}>
          <FontAwesomeIcon icon="redo" /> reset
        </button>
      </span>
    )}
  </div>
);

export default ButtonMenu;
