import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "@/App.jsx";
import "@styles/reset.css"; // Importa el archivo reset.css
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoverPasswordProvider } from "./context/RecoverPasswordContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RecoverPasswordProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoverPasswordProvider>
    </AuthProvider>
  </BrowserRouter>,
);
