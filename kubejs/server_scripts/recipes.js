// priority: 0

// Based on Create: Above and Beyond scripts

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let F = (id, x) => MOD("forge", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let CR = (id, x) => MOD("create", id, x)
let CRTAM = (id, x) => MOD("create_things_and_misc", id, x)
let MEK = (id, x) => MOD("mekanism", id, x)
let AP = (id, x) => MOD("architects_palette", id, x)
let ENV = (id, x) => MOD("environmental", id, x)
let AQU = (id, x) => MOD("upgrade_aquatic", id, x)
let TIC = (id, x) => MOD("tconstruct", id, x)
let ATM = (id, x) => MOD("atmospheric", id, x)
let AUT = (id, x) => MOD("autumnity", id, x)
let QRK = (id, x) => MOD("quark", id, x)
let IE = (id, x) => MOD("immersiveengineering", id, x)
let TH = (id, x) => MOD("thermal", id, x)
let IF = (id, x) => MOD("industrialforegoing", id, x)



let planks
onEvent('item.tags', event => {
    planks = event.get('minecraft:planks').getObjectIds()
})

//let slimeList
//onEvent('fluid.tags', event => {
//    slimeList = event.get(TIC('slime')).getObjectIds()
//})
//console.log("Slime list:")
//console.log(slimeList)


onEvent('item.tags', event => {
    event.remove(F("rods/wooden"), IE("stick_treated"))
    event.remove("balm:wooden_rods", IE("stick_treated"))

    event.add(KJ('basic_furnace'), MC('furnace'))
    event.add(KJ('basic_furnace'), QRK('deepslate_furnace'))
    event.add(KJ('basic_furnace'), QRK('blackstone_furnace'))
})

onEvent('recipes', event => {
    //immersiveNerf(event)
    betterSawdust(event)
    rubberAndPlastic(event)
    milk(event)
    slimeFix(event)
    craftingIngredientsUnify(event)
    andesiteMachine(event)
    misc(event)
})

onEvent('item.modification', event => {
    event.modify('create_dd:coal_piece', item => {
        item.burnTime = 200
    })
})

function immersiveNerf(event) {
    event.remove({ id: /immersiveengineering:crafting\/plate_.*_hammering/ })
    event.remove({ id: /immersiveengineering:crafting\/.*hammercrushing.*/ })
}

function betterSawdust(event) {
    //event.remove({ output: F('#sawdust') })

    planks.forEach(log => {
        event.recipes.createCrushing([
            IE('dust_wood'),
            Item.of(log).withChance(0.5)
        ], log)
    })

    event.remove({ input: F('#sawdust'), output: F('#paper') })
    event.shapeless(MC('paper'), IE('dust_wood', 3))
    event.recipes.createSequencedAssembly([
        MC('paper')
    ], IE('dust_wood'), [
        event.recipes.createFilling(KJ('wet_sawdust'), [
            KJ('wet_sawdust'),
            Fluid.of('water', 125)
        ]),
        event.recipes.createPressing(KJ('wet_sawdust'), KJ('wet_sawdust'))
    ]).transitionalItem(KJ('wet_sawdust')).loops(1)
}

function rubberAndPlastic(event) {
    //event.replaceInput({}, 'industrialforegoing:plastic', 'pneumaticcraft:plastic')
    event.remove({ output: 'industrialforegoing:plastic' })
    event.remove({ output: TH('rubber') })
    //event.remove({ output: IF('dryrubber') })
    event.remove({ output: 'create_dd:raw_rubber' })
    //event.remove({ output: 'pneumaticcraft:plastic' })

    event.remove({ type: 'industrialforegoing:fluid_extractor' })

    for (const [type, blocks] of Object.entries(global.wood_types)) {
        if ("log" in blocks &&
            "stripped_log" in blocks) {
            event.custom({
                type: 'industrialforegoing:fluid_extractor',
                input: Item.of(blocks.log).toJson(),
                result: blocks.stripped_log,
                breakChange: 0.010,
                output: "{FluidName:\"industrialforegoing:latex\",Amount:33}",
                defaultRecipe: false
            })
        }
    }

    event.recipes.createCompacting('industrialforegoing:tinydryrubber', Fluid.of('industrialforegoing:latex', 200))

    event.replaceInput({}, TH('rubber'), 'create_dd:raw_rubber')
    event.replaceInput({}, TH('cured_rubber'), 'create_dd:rubber')
    event.replaceInput({}, IF('dryrubber'), 'create_dd:raw_rubber')
    event.replaceOutput({}, TH('rubber'), 'create_dd:raw_rubber')
    event.replaceOutput({}, TH('cured_rubber'), 'create_dd:rubber')
    event.replaceOutput({}, IF('dryrubber'), 'create_dd:raw_rubber')

    //event.smelting(KJ('cured_rubber'), 'industrialforegoing:dryrubber')

    let rubber = 'create_dd:rubber'

    event.recipes.createPressing(IF('plastic'), rubber)

    event.remove({ mod: 'create', output: CR('belt_connector') })

    event.replaceInput({ mod: 'create' }, MC('dried_kelp'), rubber)
    event.replaceInput({ mod: 'create_enchantment_industry' }, MC('dried_kelp'), rubber)
    event.replaceInput({ mod: 'create_things_and_misc' }, MC('dried_kelp'), rubber)
    event.replaceInput({ mod: 'interiors' }, MC('dried_kelp'), rubber)
    event.replaceInput({ mod: 'createdieselgenerators' }, MC('dried_kelp'), rubber)
    event.replaceInput({ mod: 'create_dd' }, MC('dried_kelp'), rubber)


    //event.remove({ id: /create_dd:sap_from_.*_log/ })
    //event.remove({ id: /create_dd:sap_from_.*_wood/ })

    //event.remove({ output: 'industrialforegoing:straw' })
    //event.remove({ id: 'createaddition:rolling/straw' })
    //event.custom({
    //    type: 'createaddition:rolling',
    //    input: Item.of('pneumaticcraft:plastic').toJson(),
    //    result: Item.of('createaddition:straw', 3).toResultJson()
    //})
}

function milk(event) {
    event.replaceInput({}, 'neapolitan:milk_bottle', 'farmersdelight:milk_bottle')
    event.remove({ output: 'neapolitan:milk_bottle' })

    event.shapeless('4x farmersdelight:milk_bottle', [
        MC('glass_bottle', 4),
        MC('milk_bucket')
    ]).replaceIngredient({ item: Item.of(MC('milk_bucket')) }, MC('bucket'))

    event.remove({ id: 'neapolitan:milk/milk_bottles_from_bucket' })
    event.shapeless(MC('milk_bucket'), [
        '4x farmersdelight:milk_bottle',
        MC('bucket')
    ]).replaceIngredient({ item: Item.of('farmersdelight:milk_bottle') }, MC('glass_bottle'))
}

function slimeFix(event) {
    event.remove({ id: 'create_things_and_misc:slimefluidcraft' })
    event.remove({ id: 'create_things_and_misc:slime_emptying' })
    event.remove({ id: 'create_things_and_misc:slime_gun_craft' })
    event.remove({ id: 'create_things_and_misc:slime_fluid_craft' })
    event.remove({ id: 'create_things_and_misc:glue_fluid_craft' })
    event.remove({ id: 'create_things_and_misc:porridgecraft' })

    //for (slime in slimeList) {
    //    event.recipes.createFilling(CRTAM('spout_gun_slime'), [CRTAM('spout_gun'), Fluid.of(slime, 1000)])
    //    event.recipes.createFilling(CR('super_glue'), [CRTAM('glue_packaging'), Fluid.of(slime, 100)])
    //    event.recipes.createFilling(CRTAM('slime_cake'), [CR('blaze_cake_base'), Fluid.of(slime, 250)])
    //}

    let slime = TIC('earth_slime')
    event.recipes.createFilling(CRTAM('spout_gun_slime'), [CRTAM('spout_gun'), Fluid.of(slime, 1000)])
    event.recipes.createFilling(CR('super_glue'), [CRTAM('glue_packaging'), Fluid.of(slime, 100)])
    event.recipes.createFilling(CRTAM('slime_cake'), [CR('blaze_cake_base'), Fluid.of(slime, 250)])
}

function craftingIngredientsUnify(event) {
    event.replaceInput({}, 'projectred_core:red_ingot', MEK('alloy_infused'))
    event.remove({ output: 'projectred_core:red_ingot' })
    event.remove({ output: 'projectred_core:red_iron_comp' })
    event.replaceInput({}, 'thermal:redstone_servo', MEK('alloy_infused'))
    event.remove({ output: 'thermal:redstone_servo' })

    event.replaceInput({}, 'thermal:rf_coil', MEK('basic_control_circuit'))
    event.remove({ output: 'thermal:rf_coil' })

    event.replaceInput({}, IE('sawblade'), 'thermal:saw_blade')
    event.remove({ output: IE('sawblade') })
}

function andesiteMachine(event) {

    //let transitional = KJ('incomplete_kinetic_mechanism')
    //event.recipes.createSequencedAssembly([
    //    KJ('kinetic_mechanism'),
    //], MC('#wooden_slabs'), [
    //    event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
    //    event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
    //    event.recipes.createCutting(transitional, transitional),
    //]).transitionalItem(transitional).loops(1)

    //event.shapeless(KJ('kinetic_mechanism'),
    //    [MC('#logs'), CR('andesite_alloy'), CR('andesite_alloy'), CR('cogwheel')]).id(KJ('kinetic_mechanism_manual_only'))

    //event.remove({ output: 'industrialforegoing:fluid_extractor' })
    //event.shapeless("industrialforegoing:fluid_extractor",
    //    [KJ('kinetic_mechanism'), CR('andesite_casing'), MC('bucket')])

    // let's add a reason to start with Immersive Engineering
    event.remove({ mod: 'create', output: CR('white_sail') })
    event.replaceInput({ output: CR('white_sail') }, F("#rods/wooden"), IE("stick_treated"))

    event.remove({ id: IE("crafting/blastbrick") })
    event.shaped(IE("blastbrick", 3), [
        'BIB',
        'ICI',
        'BIB'
    ], {
        B: F("#ingots/brick"),
        I: F("#ingots/iron"),
        C: F("#coal_coke"),
    })

    event.remove({ id: IE("crafting/blastbrick_reinforced") })
    event.recipes.createDeploying(IE("blastbrick_reinforced"), [IE("blastbrick"), F("#plates/steel")])

    event.remove({ output: CR("mechanical_saw") })
    event.shaped(CR("mechanical_saw"), [
        'S',
        'C'
    ], {
        S: 'thermal:saw_blade',
        C: CR("andesite_casing")
    })

    //event.replaceInput({ output: CR("brass_hand") }, F("#plates/brass"), F("#plates/gold"))
    //event.remove({ output: CR("deployer") })
    //event.shaped(CR("deployer"), [
    //    'S',
    //    'C',
    //    "B"
    //], {
    //    S: CR("shaft"),
    //    C: CR("andesite_casing"),
    //    B: CR("brass_hand")
    //})
}

function misc(event) {
    event.replaceInput({ output: 'create_enchantment_industry:disenchanter' }, CR('#sandpaper'), "farmersdelight:canvas")
    event.replaceInput({}, MC('furnace'), KJ('basic_furnace'))

    event.shaped(MC('stick', 16), [
        'L',
        'L'
    ], {
        L: MC('#logs')
    })
}