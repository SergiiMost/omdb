import { Container, Loader, TextInput, Button, SimpleGrid } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useState } from "react"
import { CardComponent } from "./components/CardComponent/CardComponent"
import { NotificationComponent } from "./components/NotificationComponent/NotificationComponent"
import { fetchListOfMovies } from "./queries/fetchListOfMovies"

interface MovieData {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

function App() {
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebouncedValue(search.trim(), 500)
  const { data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [debouncedSearch],
    ({ pageParam = 1 }) => fetchListOfMovies(debouncedSearch, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length <= Math.floor(lastPage.totalResults / 10) ? allPages.length + 1 : undefined
      },
      enabled: !!debouncedSearch,
    }
  )
  const apiData = data?.pages[0].Search
  const apiSearchError = data?.pages[0].Error

  return (
    <div className="App">
      <Container size="sm" py="md">
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search for a movie"
          placeholder="Search for a movie"
          rightSection={isFetching && <Loader size="xs" />}
        />
        {error && <NotificationComponent error="Something went wrong..." type="error" />}
        {apiSearchError && <NotificationComponent error={apiSearchError} type="notification" />}
        <SimpleGrid my="md" cols={2} spacing="lg" breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}>
          {apiData &&
            data.pages.map((item) => {
              return item.Search.map((movie: MovieData) => (
                <CardComponent
                  key={movie.imdbID}
                  movieId={movie.imdbID}
                  title={movie.Title}
                  image={movie.Poster}
                  year={movie.Year}
                  btnText="Button"
                ></CardComponent>
              ))
            })}
        </SimpleGrid>

        {apiData && hasNextPage && (
          <Button fullWidth my="md" onClick={() => fetchNextPage()} loading={isFetchingNextPage ? true : false}>
            Load More
          </Button>
        )}
      </Container>
    </div>
  )
}

export default App
