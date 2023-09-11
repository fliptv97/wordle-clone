<script>
	import { onMount } from 'svelte';

	import { getRandomInt, range, compare } from '$lib/helpers.js';
	import words from '$lib/words';

	const target = words[getRandomInt(words.length)];

	$: guessesResults = [];
	$: guesses = [];

	function handleKeyUp(event) {
		const guess = guesses.at(-1) ?? '';

		if (event.key === 'Backspace') {
			if (guess.length <= 0) return;

			guesses = [...guesses.slice(0, -1), guess.slice(0, -1)];

			return;
		}

		if (event.key === 'Enter') {
			if (guess.length < target.length) {
				console.log('Not enough letters');

				return;
			}

			if (words.indexOf(guess) === -1) {
				console.log(`Word doesn't exist in database`);

				return;
			}

			guessesResults = [...guessesResults, compare(target, guess)];
			guesses = [...guesses, ''];
		}

		if (!/^[a-zA-Z]$/.test(event.key)) return;
		if (guess.length === target.length) return;

		guesses = [...guesses.slice(0, -1), guess + event.key.toLowerCase()];
	}

	onMount(() => {
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keyup', handleKeyUp);
		};
	});
</script>

<div class="table">
	{#each range(0, 6) as i}
		<div class="word">
			{#each range(0, 5) as j}
				<div
					class="letter"
					class:correct={guessesResults?.[i]?.[j] === 'x'}
					class:close={guessesResults?.[i]?.[j] === 'c'}
					class:invalid={guessesResults?.[i]?.[j] === '_'}
					style={`--delay: ${j * 100}ms`}
				>
					{guesses?.[i]?.[j] ?? ' '}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	:root {
		--color-correct: #538d4e;
		--color-close: #b59f3b;
		--color-invalid: #3a3a3c;
	}

	.table {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.word {
		display: flex;
		gap: 0.4rem;
	}

	.letter {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 3.4rem;
		height: 4rem;
		font-size: 2rem;
		font-weight: bold;
		font-family: Arial, Helvetica, sans-serif;
		text-transform: uppercase;
		color: #fff;
		background-color: var(--color-invalid);
		transition: background-color 300ms ease-in-out calc(var(--delay) + 250ms);
	}

	@keyframes rotate {
		0% {
			transform: rotateX(0deg);
		}

		50% {
			transform: rotateX(90deg);
		}

		100% {
			transform: rotateX(0deg);
		}
	}

	.letter.invalid,
	.letter.close,
	.letter.correct {
		animation: rotate 500ms ease-in-out var(--delay);
	}

	.letter.correct {
		background-color: var(--color-correct);
	}

	.letter.close {
		background-color: var(--color-close);
	}
</style>
