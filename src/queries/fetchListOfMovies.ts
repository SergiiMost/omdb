export async function fetchListOfMovies(debouncedSearch: string, pageParam = 1) {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${debouncedSearch}&type=movie&apikey=d387d3c9&page=${pageParam}`
  )
  if (!response.ok) {
    throw new Error("Something went wrong...")
  }
  return response.json()
}
