import React from "react";
import { Provider } from "react-redux";
import AppNavigations from "./app/Ui/AppNavigations";
import store from "./app/redux/store";
import ConnectApp from "./app/Screens/TestScreen";

function App() {
  return (
    <Provider store={store}>
      <ConnectApp />
      {/* <AppNavigations /> */}
    </Provider>
  );
}

export default App;
