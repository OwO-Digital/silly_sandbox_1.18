onEvent('item.tooltip', tooltip => {

	// Baubley Heart Canisters
	tooltip.add('bhc:red_heart', Text.of('Obtained from hostile mobs').red())
	tooltip.add('bhc:yellow_heart', Text.of('Obtained from boss mobs').yellow())
	tooltip.add('bhc:green_heart', Text.of('Obtained from the Ender Dragon').green())
	tooltip.add('bhc:blue_heart', Text.of('Obtained from Evokers').blue())

	// Waystones
	tooltip.addAdvanced('waystones:warp_plate', (item, advanced, text) => {
		text.add([Text.of('Place the warp plate\'s ').gray(), Text.of('attuned shard').lightPurple(), Text.of(' into another warp plate to connect them.').gray()])
		text.add([Text.of('All warp plates come with one ').gray(), Text.of('attuned shard').lightPurple(), Text.of(', but more can be crafted.').gray()])
	})

	tooltip.addAdvanced('waystones:return_scroll', (item, advanced, text) => {
		let nearest = text.get(1).string.match(/Bound to: (.+)$/)
		nearest = nearest != null ? nearest[1] : ''
		text.remove(1)
		text.add(1, [Text.of('Leads to ').gray(), Text.of(`${nearest}`).lightPurple()])
		text.add(2, Text.of('(always leads to the nearest waystone)').darkGray())
	})
	tooltip.addAdvanced('waystones:bound_scroll', (item, advanced, text) => {
		let boundTo = text.get(1).string.match(/Bound to: (.+)$/)
		boundTo = boundTo != null ? boundTo[1] : ''
		text.remove(1)
		if (item.hasNBT()) {
			text.add(1, [Text.of('Bound to ').gray(), Text.of(`${boundTo}`).lightPurple()])
		} else {
			text.add(1, Text.of('Not bound yet').gray())
		}
		text.add(2, Text.of('(can be bound to a waystone of your choosing)').darkGray())
	})

	let waystone_of_choosing = 'Lets you teleport to any of your activated waystones'
	tooltip.add('waystones:warp_scroll', Text.of(`${waystone_of_choosing}\n→ one-time use`).gray())
	tooltip.add('waystones:warp_stone', Text.of(`${waystone_of_choosing}\n→ reusable with cooldown`).gray())

	tooltip.addAdvanced([
		'waystones:waystone',
		'waystones:mossy_waystone',
		'waystones:sandy_waystone'
	], (item, advanced, text) => {
		text.add([Text.of('ⓘ ').lightPurple(), Text.of('A waystone needs to be manually activated before you can teleport to it from other waystones').gray()])
	})

	/// change waystone item names to be purple
	tooltip.addAdvanced(/waystones:.*/, (item, advanced, text) => {
		let name = text.get(0)
		text.remove(0)
		text.add(0, name.lightPurple())
	})
})
