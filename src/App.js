import GlobalStyle from "./GlobalStyle";
import './reset.css';
import Router from "./shared/Router";

function App() {
  return (
    <>
    
      <GlobalStyle />
      <div>
        <Router />
      </div>
    </>
  );
}

export default App;