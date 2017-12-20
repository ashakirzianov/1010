import * as React from "react";
import { allActionCreators } from "../redux/actions";
import { buildConnectedComp } from "../redux/react-redux-utils";
import { GameComp } from "./GameComps";

export const MainConnected = buildConnectedComp(GameComp, allActionCreators);
