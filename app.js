const rangePicker = document.querySelector('#length');
const lengthText = document.querySelector('#lengthText');
const form = document.querySelector('form');
const requiredChars = document.querySelector('#requiredCharacters');
const uppercaseCheckbox = document.querySelector('#includeUppercase');
const symbolsCheckbox = document.querySelector('#includeSymbols');
const numsCheckbox = document.querySelector('#includeNums');
const resultShower = document.querySelectorAll('.generatedPassword');
const errorTextP = document.querySelector('#errorText');
const errorTextBackground = document.querySelector('#errorBackground');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	generatePassword();
})

rangePicker.addEventListener('input', (e) => {
	const length = rangePicker.value;
	lengthText.textContent = `Password length: ${length}`;
});

function showError(error) {
	errorTextP.textContent = error;
	errorTextBackground.hidden = false;
}

function generatePassword() {
	let password = "";
	const passwordLength = rangePicker.value;
	let passwordLengthWithoutReqChars = passwordLength;
	let requiredCharactersArr = requiredChars.value.split(' ');

	let allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

	let tmp = [];
	tmp[0] = requiredCharactersArr[0];
	for(let i=1; i<requiredCharactersArr.length; i++) {
		if (tmp.findIndex(c => c === requiredCharactersArr[i]) === -1) {
			tmp.push(requiredCharactersArr[i]);
		}
	}
	requiredCharactersArr = tmp;
	console.log(requiredCharactersArr);

	if (requiredChars.value !== '' && requiredChars.value !== ' ') {
		passwordLengthWithoutReqChars = passwordLength - requiredCharactersArr.length;
	}

	console.log(passwordLengthWithoutReqChars);

	if (passwordLengthWithoutReqChars < 0) {
		showError('There are more required characters listed that are able to fit into the password length. Increase the length or reduce required characters to fit.')
		return
	}

	if (uppercaseCheckbox.checked) {
		let uppercaseChars = allowedChars.map((c) => c.toUpperCase());
		allowedChars = allowedChars.concat(uppercaseChars);
	}

	if (symbolsCheckbox.checked) {
		let symbols = ['!', '@', '#', '.', '?', '%', '&', '*', '-', '_'];
		allowedChars = allowedChars.concat(symbols);
	}

	if (numsCheckbox.checked) {
		let nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		allowedChars = allowedChars.concat(nums);
	}

	for (let i = 0; i < passwordLengthWithoutReqChars; i++) {
		const randNum = Math.floor(Math.random() * allowedChars.length);

		password += allowedChars[randNum];
	}

	for (let i = 0; i < passwordLength-passwordLengthWithoutReqChars; i++) {
		console.log('wooferf');
		// If not in array already
		if (!password.includes(requiredCharactersArr[i][0], 0)) {
			let position = Math.floor(Math.random() * password.length);
			let oldChar = password[position];

			// If the character to be replaced is a required character, choose a new character to replace
			while (requiredCharactersArr.includes(oldChar)) {
				position = Math.floor(Math.random() * password.length);
				oldChar = password[position];
			}

			password = password.replace(oldChar, requiredCharactersArr[i][0]);
			// password[position] = requiredCharactersArr[i];
			password += oldChar;

			// console.log(`Inserted special character ${requiredCharactersArr[i]} at ${position}`);
			// console.log(`Moved ${oldChar} to end`);
		}
	}

	resultShower.forEach((element) => {
		element.hidden = false;
	})
	resultShower[1].innerText = password;
	errorTextBackground.hidden = true;
}