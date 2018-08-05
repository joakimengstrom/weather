import React from 'react';

class Dropdown extends React.Component {
	handleChange = (event) => {
		this.props.onLocationChange(event.target.value);
	}

	render () {
		return (
			<select value={this.props.value} onChange={this.handleChange} className="btn btn-primary">
			<option>General</option>
        	{this.props.locations.map((x, index) => <option key={index}>{x.location}</option>)}
      		</select>
			)
	}
}

export default Dropdown;