import React from 'react';
import DataTables from 'material-ui-datatables';
import * as utils from './utils.js';


class DataViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            columns: [],
            data: []
        }
    }

    componentDidMount(){
        var state = this;

        // Add a few headers
        var headers = new Headers();
        headers.set('Content-Type', 'application/json');

        // Get the data for the table
  	    fetch(`http://127.0.0.1:5000/api/data/table`,
            {
                method: 'post',
                body: JSON.stringify({
		            dataset_id: utils.getDataSetId()
	            }),
                headers: headers
            })
            .then(function(response) {
                response.json().then(function(json) {
                    state.setState({
                        columns: json.columns,
                        data: json.data
                    })
                });
            })
            .catch(function(err) {
                alert(err);
            });
    }

    handleFilterValueChange = (value) => {
        // your filter logic
    }

    handleSortOrderChange = (key, order) => {
        // your sort logic
    }

    render() {
        return (
            <DataTables
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={this.state.columns}
                data={this.state.data}
                showCheckboxes={false}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
                page={1}
                count={10}
            />
        );
    }
}

export default DataViewer;