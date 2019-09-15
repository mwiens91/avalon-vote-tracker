import React, { useCallback, useEffect, useRef, useState } from "react";

const EditablePlayerName = ({ name, onChange }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef(null);

  const handleRootClick = useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setEditing(false);
      }
    },
    [setEditing]
  );

  useEffect(() => {
    document.addEventListener("click", handleRootClick);

    return function cleanup() {
      document.removeEventListener("click", handleRootClick);
    };
  }, [handleRootClick]);

  return (
    <span style={{ textAlign: "center" }}>
      {editing ? (
        <input
          className="form-input"
          style={{ maxWidth: "150px", margin: "auto" }}
          value={name}
          ref={ref}
          onChange={e => onChange(e.currentTarget.value)}
          onKeyPress={e =>
            ["Enter", "Escape"].includes(e.key) && setEditing(false)
          }
        />
      ) : (
        <span onClick={e => setEditing(true)}>
          {name.length >= 1 ? name : "<enter name>"}
        </span>
      )}
    </span>
  );
};

export default EditablePlayerName;
