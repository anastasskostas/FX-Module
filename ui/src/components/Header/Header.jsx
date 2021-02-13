import React, { Component } from "react";
import HeaderHtml from "./Header.html";

class HeaderComponent extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <HeaderHtml />
        )
    }
}

export default HeaderComponent;