
import { BrowserRouter } from "react-router-dom";
import { Provider} from "react-redux";
import { store } from "./store";

import { Toaster } from "sonner";

import AppRoutes from "./pages/routes";

function App() {
 

  return (
    <Provider store={store}>
      <Toaster richColors />
      <BrowserRouter>
        <AppRoutes  />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
