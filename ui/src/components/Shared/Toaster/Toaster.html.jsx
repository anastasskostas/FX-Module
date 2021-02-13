import React from 'react';
import { Toast } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
function ToasterHtml(props) {

  return (

    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '300px',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          width: 250,
          marginLeft: -120
        }}
      >

        <Toast
          key={'toast'}
          show={props.data.showToast}
          onClose={props.closeToast}
          delay={4000}
          autohide={true}
        >
          <Toast.Header className={props.data.isError ? 'text-danger' : 'text-success'}>
            <strong className="mr-auto">{props.data.customTitle ? props.data.customTitle : (props.data.isError ? 'Error' : 'Success')}</strong>
          </Toast.Header>
          <Toast.Body className={props.data.isError ? 'text-danger' : 'text-success'}>
            <strong>{ReactHtmlParser(props.data.content?.statusText)}</strong>
          </Toast.Body>
        </Toast>

      </div>
    </div>

  )

}

export default ToasterHtml