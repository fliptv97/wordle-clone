export function getRandomInt(max, min = 0) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function* range(start, end, step = 1) {
	for (let i = start; i < end; i += step) {
		yield i;
	}
}

// TODO: How can I write it in more FP style?
export function compare(target, guess) {
	const result = Array.from({ length: target.length }).fill('_');
	const guessArr = guess.split('');

	for (let i = 0; i < target.length; i++) {
		if (guess[i] === target[i]) {
			result[i] = 'x';
			guessArr[i] = ' ';
		}
	}

	for (let i = 0; i < target.length; i++) {
		if (result[i] === 'x') continue;

		const index = guessArr.indexOf(target[i]);

		if (index !== -1) {
			result[index] = 'c';
			guessArr[index] = ' ';
		}
	}

	return result.join('');
};
