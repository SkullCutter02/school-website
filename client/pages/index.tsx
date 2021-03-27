import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { GetServerSideProps } from "next";

import Hero from "../component/Hero";
import Features from "../component/Features";
import Videos from "../component/Videos";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Videos />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("features");
  await queryClient.prefetchQuery("videos");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
