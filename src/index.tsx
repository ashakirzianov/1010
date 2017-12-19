import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { MainConnected } from "./components/Main";
import { store } from "./redux/store";

ReactDOM.render(
    <Provider store={store}><MainConnected /></Provider>,
    document.getElementById("root"),
);
