import React, { useState, useCallback } from "react";

function useInput() {
  const [value, setValue] = useState("");
  const onChange = useCallback((e) => setValue(e.target.value), [value]);
  const reset = useCallback(() => setValue(""), [value]);
  const bind = {
    value,
    onChange,
  };
  return [value, bind, reset];
}

export default useInput;
