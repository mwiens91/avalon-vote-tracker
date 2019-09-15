import React, { useCallback, useEffect, useRef, useState } from "react";

const EditablePlayerName = ({ name, onChange }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef(null);
  const originalNameRef = useRef("");

  const handleRootClick = useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setEditing(false);
      }
    },
    [setEditing]
  );

  useEffect(() => {
    if (!editing) {
      return;
    }

    document.addEventListener("click", handleRootClick);

    return function cleanup() {
      document.removeEventListener("click", handleRootClick);
    };
  }, [handleRootClick, editing]);

  useEffect(() => {
    if (editing) {
      originalNameRef.current = name;
      ref.current.focus();
    }
  }, [editing]); // eslint-disable-line react-hooks/exhaustive-deps

  if (editing) {
    return (
      <input
        className="form-input"
        style={{ maxWidth: "150px", margin: "auto" }}
        value={name}
        ref={ref}
        onChange={e => onChange(e.currentTarget.value)}
        onKeyDown={e => {
          if (["Enter", "Escape"].includes(e.key)) {
            if (e.key === "Escape") {
              onChange(originalNameRef.current);
            }
            setEditing(false);
          }
        }}
      />
    );
  }
  return (
    <span onClick={e => setEditing(true)}>
      {name.length >= 1 ? name : "<enter name>"}
    </span>
  );
};

export default EditablePlayerName;
