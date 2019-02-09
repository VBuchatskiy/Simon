(function () {
	'use strict';
	var items = document.querySelectorAll('.simon__item');
	var display = document.querySelector('.simon__display');

	var level = 0;
	var index = 0;
	var sequence;
	var on = false;
	var duration = 1000;

	var random = function (n) {
		var seq = [];
		var max = 3;
		while (n) {
			n--;
			seq.push(Math.round(Math.random() * max));
		}

		return seq;
	};

	var block = function block(elements, state) {
		if (state) {
			elements.forEach(item => item.classList.add('item-unclick'));
		} else {
			elements.forEach(item => item.classList.remove('item-unclick'));
		}
	};

	var play = function play(items, order, className, duration) {
		return setTimeout(function repeat(n) {
			if (n) {
				block(items, true);
				on = true;
				n--;
				setTimeout(item => {
					item.classList.add(className);
					setTimeout(item => {
						item.classList.remove(className);
						repeat(n);
					}, duration, items[order[n]]);
				}, duration, items[order[n]]);
			} else {
				on = false;
				block(items, false);
			}
		}, 0, order.length);
	};


	var start = function start() {
		if (!on) {
			if (!level) {
				block([display], 1);
				level = 1;
				display.textContent = level;
				sequence = random(level);
				play(items, sequence, 'item_active', duration);
				return true;
			}
		}
	};

	var proceed = function proceed(e) {
		if (!on) {
			if (level) {
				if ([...items].indexOf(e.target) !== sequence[index]) {
					display.textContent = 'Incorrect';
					return false;
				} else if (index) {
					display.textContent = 'Correct';
					index -= 1;
					return false;
				} else {
					level += 1;
					display.textContent = level;
					sequence = random(level);
					index = level - 1;
					play(items, sequence, 'item_active', duration);
					return false;
				}
			}
			return true;
		}
	};


	items.forEach((item) => item.addEventListener('click', proceed));
	display.addEventListener('click', start);
}());