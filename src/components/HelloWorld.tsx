import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Store } from "../store";
import { setFoo } from "../actions";
import { AnyAction, Dispatch } from "redux";

// class HelloWorldBase extends Component<{
//     name: string,
//     setFoo: (foo: string) => void,
// }, {}> {
//     render() {
//         return <div className="main">Hello, { this.props.name }!</div>;
//     }
// }

const HelloWorldBase = (props: {
    name: string,
    setFoo: (foo: string) => void,
}) =>
    <div className="main">Hello, { props.name }!</div>;

function mapStateToProps(store: Store, own: { name: string }) {
    return {
        name: own.name,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, own: { name: string }) {
    return {
        setFoo: (foo: string) => dispatch(setFoo(foo)),
    };
}

export const HelloWorld = connect(
    mapStateToProps,
    mapDispatchToProps)(HelloWorldBase);
