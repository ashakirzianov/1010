import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { store } from "./redux/store";
import { GameComp } from "./components/GameComps";
import { connectTopLevel } from "./redux/react-redux-utils";
import { actionCreators } from "./redux/redux-utils";
import { actionsTemplate } from "./model/actions";

const allActionCreators = actionCreators(actionsTemplate);
export const App = DragDropContext(HTML5Backend)(connectTopLevel(GameComp, allActionCreators));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root"),
);
