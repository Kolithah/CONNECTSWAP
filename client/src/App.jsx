import Navbar from "./components/Navbar/index";
import Browse from "./components/browse/index";

import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/home/index";

import Profile from "./components/account/index";
import AccountRoutes from "./components/account/accountRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();
function App() {

  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />

          <Route
            path={isAuth ? "/profile/*" : "/"}
            element={<AccountRoutes />}
          />

          <Route path="/lisbon" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
