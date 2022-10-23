import { render, screen } from "@testing-library/react"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MantineProvider } from "@mantine/core"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const app = (
  <QueryClientProvider client={queryClient}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </QueryClientProvider>
)

test("renders movie search input", () => {
  render(app)
  const linkElement = screen.getByText(/Search for a movie/i)
  expect(linkElement).toBeInTheDocument()
})
