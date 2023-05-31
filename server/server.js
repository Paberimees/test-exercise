import { validateIBAN } from "./ibanvalidator.js";
import express from "express";

//Config
const app = express();
const port = 3000;

//Accept JSON data
app.use(express.json());

//Endpoints
app.post("/validate", (req, res) => {
	//If request or body is empty, return
	if (req == null || req.body == null) {
		res.statu(400);
		res.send({ result: null });
		return;
	}

	//Validate iban, send result back
	var result = validateIBAN(req.body.iban);
	console.log(`Processed iban: ${req.body.iban}, validation result: ${result}`);
	res.status(200);
	res.send({ result: result });
});

//Start server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
