import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { GameComp } from "./components/GameComps";
import { connectRedux } from "./redux/react-redux-utils";
import { actionCreators } from "./redux/redux-utils";
import { actionsTemplate } from "./model/actions";
import { connectDnd } from "./dnd/dnd-utils";

const allActionCreators = actionCreators(actionsTemplate);
export const App = connectDnd(connectRedux(GameComp, allActionCreators));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root"),
);
