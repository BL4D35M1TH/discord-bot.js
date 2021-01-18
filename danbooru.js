const Danbooru = require('danbooru');
const booru = new Danbooru();

module.exports = {
	name: 'danbooru',
	aliases: ['dan'],
	description: 'Danbooru posts',
	cooldown: 5,
	execute(message, args) {
		const tags = args.length > 0 ? `order:rank ${args[0]}` : 'order:rank rating:safe';
		booru.posts({ tags: tags, limit: 1, random: true })
			.then((result) => {
				result = result[0];
				const embed = {
					embed: {
						color: 0xff00c1,
						title: `ID ${result.id}`,
						url: result.source,
						thumbnail: {
							url: result.preview_file_url,
						},
						image: {
							url: result.large_file_url,
						},
					},
				};

				message.channel.send(embed);
			})
			.catch((error) => {
				message.channel.send(`Couldn't find danbooru post because of ${error}`);
				console.log(`Failed to get danbooru post ${error}`);
			});

	},
};