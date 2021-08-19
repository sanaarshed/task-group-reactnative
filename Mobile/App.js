import React from "react";
import { Provider } from "react-redux";
import AppNavigations from "./app/Ui/AppNavigations";
import store from "./app/redux/store";

function App() {
  return (
    <Provider store={store}>
      <AppNavigations />
    </Provider>
  );
}

export default App;
