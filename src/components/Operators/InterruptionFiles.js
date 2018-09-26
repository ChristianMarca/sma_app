import React from 'react';
// import {connect} from 'react-redux';
import axios from 'axios';
import Dropzone from 'react-dropzone'

import './interruption.css';



class InterruptionInput extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        uploadStatus: false
      }
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }


  handleUploadImage(ev) {
    ev.preventDefault();
    const data = new FormData();
    console.log(data)
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    axios.post('http://localhost:3000/upload', data)
      .then(function (response) {
        this.setState({ imageURL: `http://localhost:8000/${response.file}`, uploadStatus: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDrop= acceptedFiles => {
    console.log('files',acceptedFiles)
    var formData=new FormData();
    formData.append('userFile',acceptedFiles);
    // axios.post('http://localhost:3000/uploadOperators',formData)
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        console.log('reader',reader)
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            fetch('http://localhost:3000/uploadOperators', {
              credentials: 'same-origin', // 'include', default: 'omit'
              method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
              body: fileAsBinaryString, // Coordinate the body type with 'Content-Type'
              // headers: new Headers({
              //   'Content-Type': 'application/json'
              // }),
            })
              .then(function (response) {
                console.log('el servidor respondio',response);
              })
              .catch(function (error) {
                console.log(error);
              });
            // console.log('resultado',fileAsBinaryString)
            // do whatever you want with the file content
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.readAsBinaryString(file);
    });
}

  render() {
  /* Omitted for brevity */
  return(
    <Dropzone onDrop={(files) => this.onDrop(files)}>
      <div>Try dropping some files here, or click to select files to upload.</div>
    </Dropzone>
  )

 }
}

export default InterruptionInput;