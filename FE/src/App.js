import AppRouter from "./AppRouter";

import { GlobalStyle } from "./styles/common/GlobalStyle";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <AppRouter />
    </div>
  );
}

export default App;
