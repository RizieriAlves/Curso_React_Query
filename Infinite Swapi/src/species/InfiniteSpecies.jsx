import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi-node.now.sh/api/species";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
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
    return <h4>Carregando...</h4>;
  }
  if (isError) {
    <p>Erro! {error.toString()}</p>;
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
        return pageData.results.map((specie) => {
          return (
            <>
              <h3>{specie.fields.name}</h3>
              <p>{specie.fields.skin_color}</p>
              <p>{specie.fields.gender}</p>{" "}
            </>
          );
        });
      })}
      {isFetching ? <h5>Buscando...</h5> : null}
    </InfiniteScroll>
  );
}
