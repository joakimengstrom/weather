import React from 'react';

const SpecificTemperatureItem = (props) => {
	var date = props.temperature.created_date;
	var temperature = props.temperature.temperature.toFixed(1);
	// Taking away 'Z' and 'T' from the ISO time before displaying times
	date = date.replace("Z", " ").replace("T", " ");
	// Taking away seconds and milliseconds from the time
	date = date.slice(0, -8);
	return (
		<tr>
			<td>{date}</td>
			<td>{temperature}</td>
		</tr>
		)
}

export default SpecificTemperatureItem;