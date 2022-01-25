function palindrome(str) {
	let regex = /[^a-zA-Z0-9]+/g;
	// remove all symbols, spaces, punctuation
	// convert to lowercase
	const newString = str.replace(regex, "").toLowerCase();
	// if reversed string === str, return true
	return newString.split("").reverse().join("") === newString ? true : false;
}
