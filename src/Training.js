import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as utils from './utils.js';


class Training extends React.Component {

    handleClick(event) {
        // Add a few headers
        var headers = new Headers();
        headers.set('Content-Type', 'application/json');

        // Generate the neural network
  	    fetch(`http://127.0.0.1:5000/api/data/training`,
            {
                method: 'post',
                body: JSON.stringify({
		            dataset_id: utils.getDataSetId()
	            }),
                headers: headers
            })
            .then(function(response) {
                response.json().then(function(json) {

                });
            })
            .catch(function(err) {
                alert(err);
            });
    }

    render() {
        return (
            <div>
                <h1>Train your Neural Network</h1>
                <p>Based on the data provided, we can train the neural network.</p>
                <RaisedButton
                    label="Start Training"
                    secondary={true}
                    onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
}

export default Training;
