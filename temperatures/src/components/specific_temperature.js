import React from 'react';
import SpecificTemperatureItem from './specific_temperature_item';

const SpecificTemperature = (props) => {
	const temperatures = props.temperatures.filter(temperature => temperature.location === props.location && temperature.temperature != null);
	temperatures.map((temperature) => console.log(temperature.temperature));
	console.log(temperatures[0].location);
	// Changing the array so that the newest temperature comes first when displaying them
	temperatures.reverse();
	const temperatureItems = temperatures.map((temperature) => {
		return <SpecificTemperatureItem key={temperature._id} temperature={temperature} />
	});
	return (
		<div className="temperature-list">
		<h3>All recorded temperatures in {props.location}</h3>
		<table className="table table-bordered table-striped">
			<thead>
				<tr>
					<th>Time (UTC)</th>
					<th>Temperature (°C)</th>
				</tr>
			</thead>
			<tbody>
				{temperatureItems}
			</tbody>
		</table>
		</div>
		);
}

export default SpecificTemperature;