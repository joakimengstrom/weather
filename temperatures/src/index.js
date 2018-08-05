import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Dropdown from './components/dropdown';
import SendTemperature from './components/send_temperatures';
import GeneralTemperature from './components/general_temperatures';
import SpecificTemperature from './components/specific_temperature';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'General',
			locations: [],
			temperatures: []
		}
	}

	fetchTemperatures = (fetchUntilDifferent=false) => {
		fetch('http://localhost:8080/temperatures')
    	.then((response) => {
    		if (response.status !== 200) {
        	console.log('Looks like there was a problem. Status Code: ' +
          	response.status);
        	return;
    	}
     	response.json().then(data => {
     	if(data.length === this.state.temperatures.length && fetchUntilDifferent) {
     		this.fetchTemperatures(true);
     		return;
     	}
        this.setState({temperatures: data});
        });
    	}
  		)
  		.catch(function(err) {
    	console.log('Fetch Error :-S', err);
  		});
	}

	componentDidMount() {
		console.log("now");
		// Fetching the locations
		fetch('http://localhost:8080/locations')
    	.then((response) => {
    		if (response.status !== 200) {
        	console.log('Looks like there was a problem. Status Code: ' +
          	response.status);
        	return;
    	}
     	response.json().then(data => {
        this.setState({locations: data});
        });
    	}
  		)
  		.catch(function(err) {
    	console.log('Fetch Error :-S', err);
  		});
  		this.fetchTemperatures();

	}

	handleChange = (location) => {
		this.setState({value: location});
	}

	updateTemperatures = () => {
		this.fetchTemperatures(true);
	}

	render() {
		const value = this.state.value;
		const locations = this.state.locations;
		const temperatures = this.state.temperatures;
		let view = null;
		if(value === 'General') {
			if(locations.length > 0) {
				view =
				<div>
				<GeneralTemperature temperatures={temperatures} locations={locations}/>
				<SendTemperature locations={locations} temperatures={temperatures} onSendChange={this.updateTemperatures}/>
				</div>
			}
			else {
				view = null;
			}
		}
		else{
			view = <SpecificTemperature
			temperatures={temperatures}
			location={value} />
		}
		console.log(this.state.value);
		return (
			<div className="container">
			<Dropdown
			value={value}
			locations={locations}
			onLocationChange={this.handleChange} />
      		{view}
      		</div>
			)
	}
	
}

ReactDOM.render(
	<App />, 
	document.getElementById('root'));

