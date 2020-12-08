import React from "react";
import "../App.css";
import Footer from "../components/Footer";
import Cards from "../components/Card/Cards";
import Header from "../components/Header";
import Infos from "../components/Card/Infos";
import Box from "../components/Box";

function HomePage() {
  return (
    <>
      <Header />
      <Cards />
      <Box text="Taking care of your health" />
      <Infos />
      <Footer />
    </>
  );
}

export default HomePage;
