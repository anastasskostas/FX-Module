import React from 'react';
import ReactDOM from 'react-dom';
import ToasterComponent from '../components/Shared/Toaster/Toaster';

let count = 0;
export const displayNotification = (content, isError, customTitle = "") => {
  ReactDOM.render(<ToasterComponent content={content} isError={isError} customTitle={customTitle} newNotification={count++} />, document.getElementById('toaster-notifications'));
}
