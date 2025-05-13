import React from "react";
import productContext from "./context";

const ProductState = (props) => {
  
  return (
    <productContext.Provider value={{}}>
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
