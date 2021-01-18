const redditimage = require('@sujalgoel/reddit-image');
const wordtosub = {
	'meme': 'goodanimemes',
	'thighs': 'thighdeology',
	'boobs': 'averageanimetiddies',
	'belly': 'animemidriff',
	'good': 'eyebleach',
	'bad': 'eyeblech',
};

module.exports = {
	name: 'reddit',
	description: `Reddit content. Currently has ${Object.keys(wordtosub).join(', ')}. Or just use the subreddit's name.`,
	usage: '[keyword or subreddit]',
	cooldown: 10,
	execute(message, args) {
		redditimage.fetch({ type: 'custom', subreddit: wordtosub[args[0]] ? [wordtosub[args[0]]] : args })
			.then(({ 0: result }) => {
				const embed = {
					embed: {
						color: 0x0099ff,
						title: result.title,
						url: result.postLink,
						thumbnail: {
							url: result.thumbnail,
						},
						image: {
							url: result.image,
						},
					},
				};

				message.channel.send(embed);
			})
			.catch((error) => {
				message.channel.send(`Couldn't find post because of ${error}`);
				console.log(`Failed to get post ${error}`);
			});

	},
};