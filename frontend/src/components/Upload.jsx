import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Dropzone from "react-dropzone";

// export class UploadImage extends Component {
//     state = {
//         files: []
//     };
//
//     onDrop = (files) => {
//         // Get existing files from state
//         // (or just the empty array if there are no files in state)
//         var currentFiles = this.state.files;
//
//         // Push file(s) from function parameters to `currentFiles` array
//         const [newFiles] = files;
//         currentFiles.push(newFiles);
//
//         // Assign files dropped into component into state
//         this.setState({
//             files: currentFiles
//         });
//
//         // Attempt to upload the files.
//         // If you want to upload after a button click, move the code
//         // below to its own function and have it run after button click.
//         if (files.length) {
//             let formPayLoad = new FormData();
//
//             // I'm using "avatar" here for the attribute name of the model that
//             // will store the image. Change the first parameter of the 'append' function
//             // below to be the name of the attribute name that fits your Rails model.
//             formPayLoad.append("avatar", files[files.length - 1]);
//
//             // Pass the data to your own defined upload function
//             // that makes the call to your API. Make sure you put the
//             // formPayLoad in the body of the request.
//             this.props.upload(formPayLoad);
//         }
//     }
//
//     render() {
//         return (
//             <div className="upload-image-component">
//                 <Dropzone
//                     onDrop={this.onDrop}
//                     multiple={false}
//                 >
//                     <p>Upload your avatar here</p>
//                 </Dropzone>
//             </div>
//         );
//     }
// }
