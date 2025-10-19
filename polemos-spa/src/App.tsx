import { BrowserRouter } from "react-router";
import AuthenticationContext from "./components/AuthenticationContext";
import ThemeContext from "./components/ThemeContext";

export default function App()
{
  return(
    <AuthenticationContext>
      <ThemeContext>
        <BrowserRouter>
          
        </BrowserRouter>
      </ThemeContext>
    </AuthenticationContext>
  );
};
