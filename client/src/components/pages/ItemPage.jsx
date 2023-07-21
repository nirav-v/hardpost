import React from "react";
import { useState, useEffect } from "react";

function ItemPage({ itemId }) {
  useEffect(() => {
    fetch(`/shop/${itemId}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  return <div></div>;
}

export default ItemPage;
