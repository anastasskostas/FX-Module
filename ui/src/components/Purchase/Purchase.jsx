import React, { Component } from "react";
import PurchaseHtml from "./Purchase.html";

class PurchaseComponent extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <PurchaseHtml
                data={this.state}
            />
        )
    }
}

export default PurchaseComponent;