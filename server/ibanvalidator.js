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
	let rearrangedIBAN = IBAN.substring(4) + IBAN.substring(0, 4);
	let numbersIBAN = charactersToNumbers(rearrangedIBAN);
	return BigInt(numbersIBAN);
}

//Converts one country code character to number
function charactersToNumbers(IBAN) {
	//Gets position in string, i.e. with A index is 0, adds 10 to it. Z = 25 etc, so IBAN format A=10...Z=35 is met.
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	IBAN = IBAN.toUpperCase();
	for (let character of alphabet) {
		IBAN = IBAN.replaceAll(character, alphabet.indexOf(character) + 10);
	}
	return IBAN;
}

export { validateIBAN };
