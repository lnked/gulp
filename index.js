function filter(messages, rules)
{
	var m, r;

	var filter = {
		check: function()
		{

		},
		
		run: function()
		{

			console.log('------------------------');

			for (r in rules)
			{
				if (!rules[r].hasOwnProperty('action'))
				{
					delete rules[r];
				}
			}

			console.log('------------------------');

			for (m in messages)
			{
				if (messages[m].hasOwnProperty('from') && messages[m].hasOwnProperty('to'))
				{
					
				}
			}

		},

		init: function()
		{
			this.run();
		}
	};

	filter.init();

	// console.log('messages\n', messages);
	// console.log('rules\n', rules);
}

filter(
	{
	    msg1: {from: 'jack@example.com', to: 'jill@example.org'},
	    msg2: {from: 'noreply@spam.com', to: 'jill@example.org'},
	    msg3: {from: 'boss@work.com', to: 'jack@example.com'}
	},
	[
	    {
	    	from: '*@work.com',
	    	action: 'tag work'
	    },
	    {
	    	from: '*@spam.com',
	    	action: 'tag spam'
	    },
	    {
	    	from: 'jack@example.com', 
	    	to: 'jill@example.org', 
	    	action: 'folder jack'
	    },
	    {
	    	to: 'jill@example.org', 
	    	action: 'forward to jill@elsewhere.com'
	    }
	]
);

// {
//     msg1: ['folder jack', 'forward to jill@elsewhere.com'],
//     msg2: ['tag spam', 'forward to jill@elsewhere.com'],
//     msg3: ['tag work']
// }

// messages — это объект, ставящий в соответствие уникальным идентификаторам сообщений объекты с двумя свойствами: from и to. Каждый такой объект описывает одно электронное письмо.
// rules — это массив объектов с тремя свойствами: from (необязательно), to (необязательно) и action (обязательно). Каждый из этих объектов описывает одно правило фильтрования.