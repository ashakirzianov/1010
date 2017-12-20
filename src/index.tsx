import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { GameComp } from "./components/GameComps";
import { allActionCreators } from "./redux/actions";
import { connectTopLevel } from "./redux/react-redux-utils";

export const App = connectTopLevel(GameComp, allActionCreators);

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root"),
);
