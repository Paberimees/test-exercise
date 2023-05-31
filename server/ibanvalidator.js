function validateIBAN(IBAN) {
	if (IBAN == null) {
		return false;
	}
	var IBANasNumber = IBANtoBigInt(IBAN);
	if (IBANasNumber % 97n == 1) {
		return true;
	}
	return false;
}

//Converts the IBAN country code to digits, moves digits around, returns BigInt to modulo later
function IBANtoBigInt(IBAN) {
	let countryCode = IBAN.substring(0, 2);
	let countryNumbers =
		characterToNumberString(countryCode[0]) +
		characterToNumberString(countryCode[1]);
	let bigNumber = IBAN.substring(4) + countryNumbers + IBAN.substring(2, 4);
	return BigInt(bigNumber + "");
}

//Converts one country code character to number
function characterToNumberString(character) {
	//Gets position in string, i.e. with A index is 0, adds 10 to it. Z = 25 etc, so IBAN format A=10...Z=35 is met.
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return (alphabet.indexOf(character.toUpperCase()) + 10).toString();
}

export { validateIBAN };
