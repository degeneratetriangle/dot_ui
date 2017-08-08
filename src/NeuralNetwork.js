import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import * as utils from './utils.js';


const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class NeuralNetwork extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            additionalHiddenLayers:1,
            includeDropouts:true
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleClick(event) {
        var state = this;

        // Add a few headers
        var headers = new Headers();
        headers.set('Content-Type', 'application/json');

        // Generate the neural network
  	    fetch(`http://127.0.0.1:5000/api/data/nn`,
            {
                method: 'post',
                body: JSON.stringify({
		            dataset_id: utils.getDataSetId(),
                    additional_hidden_layers: state.state.additionalHiddenLayers,
                    include_dropouts: state.state.includeDropouts
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
                <h1>Create your Neural Network</h1>
                <p>Based on the data provided, we can generate a neural network that's best suited to learn from
                    the data.</p>
                <TextField
                    hintText="Number of additional hidden layers"
                    floatingLabelText="Additional hidden layers"
                    name="additionalHiddenLayers"
                    value={this.state.additionalHiddenLayers}
                    onChange={this.handleInputChange}
                /><br />
                <Checkbox
                    label="Include dropouts"
                    name="includeDropouts"
                    style={styles.checkbox}
                    checked={this.state.includeDropouts}
                    onChange={this.handleInputChange}
                />
                <RaisedButton
                    label="Create"
                    secondary={true}
                    onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
}

export default NeuralNetwork;
