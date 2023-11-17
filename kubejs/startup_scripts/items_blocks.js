// priority: 0

let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let MC = (id, x) => MOD("minecraft", id, x)

onEvent('item.registry', event => {
    //let mechanism = (name) => {
    //    let id = name.toLowerCase()
    //    event.create(id + '_mechanism').texture("kubejs:item/" + id + "_mechanism").displayName(name + ' Mechanism')
    //    event.create('incomplete_' + id + '_mechanism', 'create:sequenced_assembly').texture("kubejs:item/incomplete_" + id + "_mechanism").displayName('Incomplete ' + name + ' Mechanism')
    //}

    //mechanism('Kinetic')

    event.create('wet_sawdust', 'create:sequenced_assembly').displayName('Wet Sawdust').texture("kubejs:item/wet_sawdust")


    //event.create('zinc_sheet').displayName('Zinc Sheet').texture("createaddition:item/zinc_sheet")

    //event.create('cured_rubber').displayName('Cured Rubber').texture("kubejs:item/cured_rubber")
})