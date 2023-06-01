import axios from "axios";
import { readFile, writeFile } from "fs";
import { resolve as resolvePath, parse as parsePath, dirname } from "path";
import { fileURLToPath } from "url";

//Hack to allow __dirname usage in modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = "http://localhost:3000";

//Sends POST call to API that validates IBANs
function validateIBAN(IBAN) {
	return new Promise((resolve, reject) => {
		axios.post(`${url}/validate`, { iban: IBAN }).then(
			(response) => {
				resolve(response.data.result);
			},
			(error) => {
				reject(error);
			}
		);
	});
}

async function readInput(filePath) {
	return new Promise((resolve, reject) => {
		readFile(filePath, "utf-8", (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data.split("\n"));
			}
		});
	});
}

//Reads input from file, makes new output file in same place with .out extension
async function generateOutput(filePath) {
	var IBANs = await readInput(filePath);
	var output = "";

	for (let rawIBAN of IBANs) {
		let IBAN = rawIBAN.trim(); //Line breaks and such, gets rid of em
		output = output + `${IBAN};${await validateIBAN(IBAN)}` + "\n";
	}

	writeOutput(filePath, output);
}

//Writes output to file
function writeOutput(filePath, data) {
	//Changes the extension, puts the new path together again
	let pathSegments = parsePath(filePath);
	pathSegments.ext = ".out";
	let resolvedPath = resolvePath(
		pathSegments.dir,
		pathSegments.name + pathSegments.ext
	);
	console.log(resolvedPath);
	writeFile(resolvedPath, data, "utf-8", (error) => {
		if (error) throw error;
	});
}

function main() {
	var fileName = "input2.txt";
	var filePath = resolvePath(__dirname, fileName);
	generateOutput(filePath);
}

main();
