import QueryClientProvider from "./src/QueryClientProvider.js";
import App from "./src/App.js";

export default function Main() {
  return (
    <QueryClientProvider>
      <App/>
    </QueryClientProvider>
  );
}

