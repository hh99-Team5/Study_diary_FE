import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "./GlobalStyle";
import './reset.css';
import Router from "./shared/Router";
import { createContext } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);


const App =() => {
  const cookie = new Cookies();
  const userToken = cookie.get('jwtToken');
  const loginUser = jwtDecode(userToken);
  const userInfo = loginUser;
  const queryClient = new QueryClient();
  return (
    <UserContext.Provider value={{userInfo}}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
          <Router />
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;