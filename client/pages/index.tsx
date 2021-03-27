import React from "react";

import Hero from "../component/Hero";
import Features from "../component/Features";
import Videos from "../component/Videos";
import Posts from "../component/Posts";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Videos />
      <Posts />
    </>
  );
};

export default HomePage;
