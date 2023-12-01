// priority: 99

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let F = (id, x) => MOD("forge", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)

let raw_logs

onEvent('item.tags', event => {

    console.log('DATA GENERATION BEGINS HERE')

    raw_logs = event.get(MC('logs')).getObjectIds().map(element => {
        return Item.getItem(element)
    })

    //raw_logs.forEach(element => {
    //    console.log(element.getId().split(':'))
    //});
})

onEvent('recipes', event => {

    // you can do `Ingredient.of('#forge:stripped_logs').itemIds` to get an array featuring all items under that tag

    console.log('DATA GENERATION CONTINUES HERE')

    event.forEachRecipe({ input: raw_logs, output: raw_logs }, recipe => {
        console.log(recipe)
    })
})