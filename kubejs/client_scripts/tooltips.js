onEvent('item.tooltip', tooltip => {
	tooltip.add('bhc:red_heart', Text.of('Obtained from hostile mobs').red())
	tooltip.add('bhc:yellow_heart', Text.of('Obtained from boss mobs').yellow())
	tooltip.add('bhc:green_heart', Text.of('Obtained from the Ender Dragon').green())
	tooltip.add('bhc:blue_heart', Text.of('Obtained from Evokers').blue())

})
