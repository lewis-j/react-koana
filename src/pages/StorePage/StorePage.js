import React, { useEffect, useState } from "react";
import { Carousel } from "../../Components/Carousel";
import styles from "./StorePage.module.scss";

const products = ["coffee", "teas", "art"];

const renderProducts = () =>
  products.map((product, i) => (
    <div key={`productId#${i}`}>
      <div>Testing our listings</div>
      <div>{product}</div>
    </div>
  ));

const StorePage = () => {
  return (
    <div>
      <Carousel className={styles.carousel}>{renderProducts()}</Carousel>
    </div>
  );
};

export default StorePage;
