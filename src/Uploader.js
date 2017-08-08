import React from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import * as utils from './utils.js';


var request = require('superagent');
var apiBaseUrl = "http://127.0.0.1:5000/api/uploads/data";
//var apiBaseUrl = "http://0.0.0.0:4000/api/uploads/data";


class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            filesPreview:[],
            filesToBeSent:[],
            printcount:10,
        }
    }

    onDrop(acceptedFiles, rejectedFiles) {
        // console.log('Accepted files: ', acceptedFiles[0].name);
        var filesToBeSent=this.state.filesToBeSent;

        if (filesToBeSent.length < this.state.printcount) {
            filesToBeSent.push(acceptedFiles);
            var filesPreview=[];

            for (var i in filesToBeSent) {
                filesPreview.push(
                    <div>
                        {filesToBeSent[i][0].name}
                    </div>)
            }

            this.setState({filesToBeSent,filesPreview});
        } else {
            alert("You have reached the limit of data files at a time")
        }
    }

    handleClick(event) {
        // console.log("handleClick",event);
        if (this.state.filesToBeSent.length > 0) {
            var filesArray = this.state.filesToBeSent;
            var req = request.post(apiBaseUrl);

            for (var i in filesArray) {
                // console.log("files",filesArray[i][0]);
                req.attach('data',filesArray[i][0])
            }

            req.end(function(err, res){
                if (err) {
                    console.log("error ocurred");
                }
                console.log("res",res);

                // Store the data set identifier so we have it going forward
                utils.setDataSetId(res.body.dataset_id);

                alert('dataset_id: ' + res.body.dataset_id);
            });
        } else {
            alert("Please upload some files first");
        }
    }

    render() {
        return (
            <div>
                <h1>Upload your Data</h1>
                <p>You can upload upto {this.state.printcount} files at a time.</p>
                <Dropzone onDrop={(files) => this.onDrop(files)}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
                <p>Files to be analyzed are: {this.state.filesPreview}</p>
                <p>{this.state.printingmessage}</p>
                <RaisedButton
                    label="Upload Data"
                    secondary={true}
                    onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
}

export default Uploader;
