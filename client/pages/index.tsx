import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { GetServerSideProps } from "next";

import Hero from "../component/Hero";
import Features from "../component/Features";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("features");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
