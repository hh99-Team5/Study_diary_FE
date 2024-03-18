import { QueryClient, QueryClientProvider } from "react-query";
import { searchMember } from "./service/MemberService";
import GlobalStyle from "./GlobalStyle";
import './reset.css';
import Router from "./shared/Router";
import { createContext } from "react";
import Cookies from "universal-cookie";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const UserContext = createContext(null);
const cookie = new Cookies();
const jwtToken = cookie.get('jwtToken');
const App =() => {
  const [userInfo, setUser] = useState({});
  useEffect(() => {
    if(jwtToken){
      loginUser();
    }
  },[])
  const loginUser = async() => {
    const response = await searchMember();
    setUser(response.data.data);
  }

  if(userInfo){
    console.log("user = ", userInfo);
  }
  
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