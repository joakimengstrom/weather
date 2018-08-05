import React from 'react';

const GeneralTemperatureItem = (props) => {
	const location = props.location;
	const temperatures = props.temperatures.map((temperature) => temperature.temperature);
	var highest = Math.max(...temperatures).toFixed(1);
	var lowest = Math.min(...temperatures).toFixed(1);
	if (temperatures.length === 0) {
		highest = null;
		lowest = null;
	}
	var latest = temperatures.pop();
	if(latest) {
		latest = latest.toFixed(1);
	}
	return (
			<tr>
				<td>{location.location}</td>
				<td>{latest}</td>
				<td>{highest}</td>
				<td>{lowest}</td>
			</tr>
		)
}

export default GeneralTemperatureItem;