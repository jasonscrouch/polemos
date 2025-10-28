import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticationContext from "./components/AuthenticationContext";
import ThemeContext from "./components/ThemeContext";
import Home from "./components/pages/Home";
import Layout from "./components/Layout";
import NotFound from "./components/pages/NotFound";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Help from "./components/pages/Help";

export default function App()
{
  const client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:8000/graphql" }),
    cache: new InMemoryCache(),
  });

  return(
    <ApolloProvider client={client}>
      <AuthenticationContext>
        <ThemeContext>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <Layout />}>
                <Route index element={ <Home/> } />
                <Route path="/about" element={ <About />} />
                <Route path="/help" element={ <Help /> }/>
                <Route path="/signin" element={ <SignIn /> }></Route>
                <Route path="/signup" element={ <SignUp />}></Route>
              </Route>
              <Route path="/*" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </ThemeContext>
      </AuthenticationContext>
    </ApolloProvider>
  );
};
