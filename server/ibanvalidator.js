function validateIBAN(IBAN) {
	if (IBAN == null) {
		return false;
	}
	if (!IBANLengthCheck(IBAN)) {
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

function IBANLengthCheck(IBAN) {
	var lengths = {
		AL: 28,
		AD: 24,
		AT: 20,
		AZ: 28,
		BH: 22,
		BY: 28,
		BE: 16,
		BA: 20,
		BR: 29,
		BG: 22,
		BI: 27,
		CR: 22,
		HR: 21,
		CY: 28,
		CZ: 24,
		DK: 18,
		DJ: 27,
		DO: 28,
		EG: 29,
		SV: 28,
		EE: 20,
		FO: 18,
		FI: 18,
		FR: 27,
		GE: 22,
		DE: 22,
		GI: 23,
		GR: 27,
		GL: 18,
		GT: 28,
		VA: 22,
		HU: 28,
		IS: 26,
		IQ: 23,
		IE: 22,
		IL: 23,
		IT: 27,
		JO: 30,
		KZ: 20,
		XK: 20,
		KW: 30,
		LV: 21,
		LB: 28,
		LY: 25,
		LI: 21,
		LT: 20,
		LU: 20,
		MT: 31,
		MR: 27,
		MU: 30,
		MD: 24,
		MC: 27,
		ME: 22,
		NL: 18,
		MK: 19,
		NO: 15,
		PK: 24,
		PS: 29,
		PL: 28,
		PT: 25,
		QA: 29,
		RO: 24,
		RU: 33,
		LC: 32,
		SM: 27,
		ST: 25,
		SA: 24,
		RS: 22,
		SC: 31,
		SK: 24,
		SI: 19,
		SO: 23,
		ES: 24,
		SD: 18,
		SE: 24,
		CH: 21,
		TL: 23,
		TN: 24,
		TR: 26,
		UA: 29,
		AE: 23,
		GB: 22,
		VG: 24,
	};

	let countryCode = IBAN.substring(0, 2);
	if (IBAN.length != lengths[countryCode]) {
		console.log(`IBAN ${IBAN} is not correct length for country!`);
		return false;
	}
	return true;
}

export { validateIBAN };
