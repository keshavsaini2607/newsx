import { useLayoutEffect, useState } from "react";

export const errorHandler = (data, res, statusCode = 400) => {
  res.status(statusCode).json({
    error: true,
    message: data,
  });
};

export const responseHandler = (data, res, statusCode = 200) => {
  res.status(statusCode).json({
    error: false,
    body: data,
  });
};

export const validateFields = (fields) => {
  console.log(fields);
  for (let key in fields) {
    if (fields[key].trim() === "" || !fields[key].trim()) {
      throw new Error( `${key} is required`);
    }
  }
};

export const getValue = (obj, path, defaultValue) => {
  try {
    if (!(obj instanceof Array)) {
      let myValue = obj;
      for (let key of path) {
        if (!(key in myValue)) {
          return defaultValue;
        } else {
          myValue = myValue[key];
        }
      }
      return myValue;
    }
  } catch (error) {
    console.log({ error });
    return defaultValue;
  }
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}