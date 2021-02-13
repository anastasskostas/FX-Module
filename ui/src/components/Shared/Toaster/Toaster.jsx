import React, { Component } from 'react';
import ToasterHtml from "./Toaster.html";

class ToasterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: props.content ? props.content : '',
      customTitle: props.customTitle,
      isError: props.isError,
      showToast: true,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.newNotification !== prevProps.newNotification) {
      this.setState({
        content: this.props.content,
        customTitle: this.props.customTitle,
        isError: this.props.isError,
        showToast: true
      })
    }
  }

  closeToast = () => {
    this.setState({
      showToast: false
    })
  }

  render() {
    return (
      <ToasterHtml
        data={this.state}
        closeToast={this.closeToast}
      />
    )
  }
}

export default ToasterComponent;