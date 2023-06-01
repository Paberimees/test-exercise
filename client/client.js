import promptSync from "prompt-sync";
import { generateOutput, validateIBAN } from "./logic.js";

const prompt = promptSync();

console.log("Welcome to IBAN validator.");
var running = true;

while (running) {
	console.log(
		"Type a letter for corresponding action:\n[S] single validation\n[F] multi-validation via file\n[Q] quit\n"
	);
	var action = prompt();
	action = action.toUpperCase();

	switch (action) {
		case "Q":
			running = false;
			console.log("Exiting program...");
			break;
		case "S":
			console.log("Single validation, please enter an IBAN to validate:");
			let input = prompt();
			let result = await validateIBAN(input);
			console.log(`Is that IBAN valid: ${result}\n`);
			break;
		case "F":
			console.log("File validation, please enter a filename with IBANs:");
			let fileName = prompt();
			await generateOutput(fileName);
			console.log(`Output file .out created for ${fileName}\n`);
			break;
		default:
			console.log("Unrecognized command, please try again!\n");
	}
}
