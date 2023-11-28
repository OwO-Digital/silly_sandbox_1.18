// priority: 80

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let F = (id, x) => MOD("forge", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let QRK = (id, x) => MOD("quark", id, x)
let IE = (id, x) => MOD("immersiveengineering", id, x)

onEvent('item.tags', event => {
    event.remove(F("rods/wooden"), IE("stick_treated"))
    event.remove("balm:wooden_rods", IE("stick_treated"))

    event.add(KJ('basic_furnace'), MC('furnace'))
    event.add(KJ('basic_furnace'), QRK('deepslate_furnace'))
    event.add(KJ('basic_furnace'), QRK('blackstone_furnace'))
})

onEvent('tags.fluids', event => {
    event.add('forge:experience', 'create_enchantment_industry:experience')
})