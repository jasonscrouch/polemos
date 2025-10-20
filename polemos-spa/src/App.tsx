import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticationContext from "./components/AuthenticationContext";
import ThemeContext from "./components/ThemeContext";
import Home from "./components/Home";
import Layout from "./components/Layout";
import { Container } from "react-bootstrap";
import NotFoundPage from "./components/NotFoundPage";

export default function App()
{
  return(
    <AuthenticationContext>
      <ThemeContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Layout />}>
              <Route index element={ <Home/> } />
            </Route>
            <Route path="/*" element={<NotFoundPage />}/>
          </Routes>
        </BrowserRouter>
      </ThemeContext>
    </AuthenticationContext>
  );
};
