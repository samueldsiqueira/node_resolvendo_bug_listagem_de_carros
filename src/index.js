import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const cars = [];

app.post('/cars', (request, response) => {
	const { model, brand, year, color, plate } = request.body;

	const carAlreadyExist = cars.find((car) => car.year === year);

	if (carAlreadyExist) {
		return res.status(400).json({ error: 'this car already exist' });
	}

	cars.push({
		model,
		brand,
		year,
		color,
		plate,
		id: uuidv4(),
	});

	return response.status(201).send();
});

app.get('/', (request, response) => {
	return response.json(cars);
});

app.listen('3000');
