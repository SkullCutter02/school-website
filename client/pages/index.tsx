import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("features");
  await queryClient.prefetchQuery("videos");
  await queryClient.prefetchQuery(["posts", 1, ""]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
