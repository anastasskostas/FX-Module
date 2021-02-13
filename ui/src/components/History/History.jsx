import React, { Component } from "react";
import HistoryHtml from "./History.html";

class HistoryComponent extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
    }

    

    render() {
        return (
            <HistoryHtml
                data={this.state}
            />
        )
    }
}

export default HistoryComponent;