import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticationContext from "./components/AuthenticationContext";
import ThemeContext from "./components/ThemeContext";
import Home from "./components/pages/Home";
import Layout from "./components/Layout";
import NotFound from "./components/pages/NotFound";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";

export default function App()
{
  return(
    <AuthenticationContext>
      <ThemeContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Layout />}>
              <Route index element={ <Home/> } />
              <Route path="/about" element={ <About />} />
              <Route path="/signin" element={ <SignIn /> }></Route>
            </Route>
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </ThemeContext>
    </AuthenticationContext>
  );
};
