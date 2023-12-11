onEvent('rei.group', event => {
    const nbt_groups = [
        'potion',
        'enchanted_book',
        'splash_potion',
        'tipped_arrow',
        'lingering_potion',
        'mekanism:creative_chemical_tank',
        'mekanism:creative_fluid_tank'
    ]

    nbt_groups.forEach(id => {
        console.log(`Grouping ${id}`)
        const item = Item.of(id)
        const { namespace, path } = Utils.id(item.id)
        event.groupSameItem(`kubejs:rei_groups/${namespace}/${path}`, item.name, item)
    })

    event.groupItems('kubejs:rei_groups/spawn_eggs', 'Spawn eggs', [/.*spawn_egg.*/, /ars_nouveau:.*_se/])

    event.groupItemsByTag('kubejs:rei_groups/minecraft/beds', 'Beds', 'minecraft:beds')
    event.groupItemsByTag('kubejs:rei_groups/upgrade_aquatic/bedrolls', 'Bedrolls', 'upgrade_aquatic:bedrolls')
    event.groupItemsByTag('kubejs:rei_groups/minecraft/beds', 'Beds', 'minecraft:beds')

    event.groupItemsByTag('kubejs:rei_groups/waystones/dyed_sharestone', 'Dyed Sharestones', 'waystones:dyed_sharestone')
})

onEvent('rei.hide.items', event => {
    event.hide(Item.of('cb_microblock:microblock').ignoreNBT())

    event.hide(/ironjetpacks:.*_coil/)
    event.hide(Item.of('ironjetpacks:cell').ignoreNBT())
    event.hide(Item.of('ironjetpacks:thruster').ignoreNBT())
    event.hide('ironjetpacks:strap')
})