import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const initialUrl = "https://swapi-node.now.sh/api/people";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        return `https://swapi-node.now.sh${lastPage.next}`;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <p>Error: {error.toString()}</p>;
  }

  return (
    <InfiniteScroll
      initialLoad={false}
      loadMore={() => {
        if (!isFetching) {
          fetchNextPage();
        }
      }}
      hasMore={hasNextPage}
    >
      {data?.pages?.map((pageData) => {
        return pageData?.results?.map((person) => {
          return (
            <Person
              key={person.fields.name}
              name={person.fields.name}
              hairColor={person.fields.hair_color}
              eyeColor={person.fields.eye_color}
            />
          );
        });
      })}
      {isFetching ? <h4>Buscando...</h4> : null}
    </InfiniteScroll>
  );
}
