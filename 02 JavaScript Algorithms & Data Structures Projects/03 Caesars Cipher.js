function rot13(str) {
	const alphabet = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];

	const reg = /[A-Z]/;
	let strArray = str.split("");
	let result = "";
	for (let i = 0; i < strArray.length; i++) {
		if (reg.test(strArray[i])) {
			let num = alphabet.indexOf(strArray[i]) - 13;
			if (num < 0) {
				num = alphabet.length + num;
				result += alphabet[num];
			} else {
				result += alphabet[num];
			}
		} else {
			result += strArray[i];
		}
	}
	return result;
}
