import React from 'react';
import GeneralTemperatureItem from './general_temperatures_item';

var id_counter = 0;

const GeneralTemperature = (props) => {
	// A day in milliseconds
	const day = 86400000;
	const now = Date.now();
	const locations = props.locations;
	const temperatures = props.temperatures;
	const result = locations.map((location) => {
		// Creates arrays of the temperatures during the last 24h for each location separately
		const temp = temperatures.filter(temperature => temperature.location === location.location && now - new Date(temperature.created_date) < day && temperature.temperature != null);
		return <GeneralTemperatureItem location={location} temperatures={temp} key={id_counter++}/>
	});
	return (
		<div className="general">
		<h3>Recorded temperatures in last 24 hours</h3>
		<table className="table table-bordered table-striped">
			<thead>
				<tr>
					<th>Location</th>
					<th>Latest temperature (°C)</th>
					<th>Highest temperature (°C)</th>
					<th>Lowest temperature (°C)</th>
				</tr>
			</thead>
			<tbody>
				{result}
			</tbody>
		</table>
		</div>
	)
}

export default GeneralTemperature;