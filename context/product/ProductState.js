import React from "react";
import productContext from "./productContext";

const ProductState = (props) => {
  return (
    <productContext.Provider value={{}}>
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
