import React from 'react';

class SendTemperature extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: this.props.locations[0].location,
			temperature: ''
		};
	}

	handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		var number = Number(this.state.temperature);
		fetch('http://localhost:8080/temperatures', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
      		body: JSON.stringify({
        		location: this.state.locations,
       			temperature: number,
       		})
		})
		.catch((error) => {
			console.log(error);
		});
		// Returns to initial state after form being sent
		this.setState({
			locations: this.props.locations[0].location,
			temperature: ''
		});
		this.props.onSendChange();
	}	




render() {
	return (
		<div className="sendtemp">
		<h3>Send new temperature</h3>
		<form onSubmit={this.handleSubmit} className="form-inline">
			<div className="form-group">
			<label>
				Location: 
				<select value={this.state.locations} onChange={this.handleChange} name="locations" className="form-control">
        		{this.props.locations.map((x, index) => <option key={index}>{x.location}</option>)}
      			</select>
			</label>
			</div>
			<div className="form-group">
			<label>
				Temperature: 
				<input
				type="number"
				required
				name="temperature"
				value={this.state.temperature}
				onChange={this.handleChange}
				className="form-control" />
			</label>
			</div>
			<button type="submit" className="btn btn-primary">
    		Send 
    		</button>
    	</form>
    	</div>

		)
	}
}

export default SendTemperature;