const defaults = {
	categories: 4, // 3 or 4 only
	size: 5, // 3, 4 or 5... 6?
	labels: ['Students', 'Subjects', 'Teachers', 'Grades'],
	items: [
		['Adrian', 'Bruce', 'Dave', 'Nicko', 'Steve'],
		['Chemistry', 'French', 'History', 'Maths', 'Music'],
		[
			'Mr Bettencourt',
			'Mrs Hammett',
			'Dr Malmsteen',
			'Mr Mustaine',
			'Miss Petrucci',
		],
		['A', 'B', 'C', 'D', 'E'],
	],
};

const constants = {
	MAX_CATS: 4,
	MAX_SIZE: 6,
};

export { defaults, constants };
