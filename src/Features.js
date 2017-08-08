import React from 'react';
import TextField from 'material-ui/TextField';
import * as utils from './utils.js';


class Features extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            featuresToRemove:'',
            featuresToExtract:''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    preProcessData() {
        // Add a few headers
        var headers = new Headers();
        headers.set('Content-Type', 'application/json');

        // Get the features from the provided strings
        var featuresToRemove = JSON.parse('[' + this.state.featuresToRemove + ']');
        var featuresToExtract = JSON.parse('[' + this.state.featuresToExtract + ']');

        // Kick off the data pre processing
  	    return fetch(`http://127.0.0.1:5000/api/data/preprocessing`,
            {
                method: 'post',
                body: JSON.stringify({
		            dataset_id: utils.getDataSetId(),
                    features_to_remove: featuresToRemove,
                    features_to_extract: featuresToExtract
	            }),
                headers: headers
            });
    }

    render() {
        return (
            <div>
                <h1>Clean up your Data</h1>
                <p>In order for the neural network to perform best, you can give it additional information about the
                    provided data.</p>
                <TextField
                    hintText="Column numbers (e.g. 0, 3, 8)"
                    floatingLabelText="Which columns are not needed?"
                    name="featuresToRemove"
                    value={this.state.featuresToRemove}
                    onChange={this.handleInputChange}
                /><br />
                <TextField
                    hintText="Column numbers (e.g. 0, 3, 8)"
                    floatingLabelText="Which columns contain categories?"
                    name="featuresToExtract"
                    value={this.state.featuresToExtract}
                    onChange={this.handleInputChange}
                />
            </div>
        );
    }
}

export default Features;
