import React from "react";

import Hero from "../components/main/Hero";
import Features from "../components/main/Features";
import Videos from "../components/main/Videos";
import Opportunities from "../components/main/Opportunities";
import Posts from "../components/main/Posts";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Videos />
      <Opportunities />
      <Posts />
    </>
  );
};

export default HomePage;
