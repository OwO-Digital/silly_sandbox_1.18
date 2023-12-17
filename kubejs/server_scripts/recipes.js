// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

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
let EC = (id, x) => MOD("extendedcrafting", id, x)
let PR_C = (id, x) => MOD("projectred_core", id, x)
let PR_T = (id, x) => MOD("projectred_transmission", id, x)
let PR_I = (id, x) => MOD("projectred_illumination", id, x)
let RFU = (id, x) => MOD("rftoolsutility", id, x)
let TE = (id, x) => MOD("thermal", id, x)

let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']


//function get_ec_helpers(event) {
//    function ec_shaped(result, pattern, key) {
//        let parsed_key
//        for (const [key, value] of Object.entries(key)) {
//            parsed_key[key] = value.toJson()
//        }
//
//        return event.custom({
//            type: EC('shaped_table'),
//            pattern: pattern,
//            key: 
//        })
//    }
//}


let planks
onEvent('item.tags', event => {
    planks = event.get('minecraft:planks').getObjectIds()
})

//let slimeList
//onEvent('tags.fluids', event => {
//    slimeList = event.get(TIC('slime')).getObjectIds()
//})
//console.log("Slime list:")
//console.log(slimeList)



onEvent('recipes', event => {
    //immersiveNerf(event)
    nerfRFTools(event)
    betterSawdust(event)
    rubberAndPlastic(event)
    milk(event)
    slimeFix(event)
    craftingIngredientsUnify(event)
    extendedCraftingSetup(event)
    jetpacks(event)
    andesiteMachine(event)
    wireless(event)
    waystones(event)
    redstone_circuits(event)
    misc(event)
    extendedMechanicalCrafting(event)
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

function nerfRFTools(event) {
    event.remove({ output: Item.of(RFU('syringe')).ignoreNBT() })
    event.remove({
        output: [
            RFU('tank'),
            RFU('matter_transmitter'),
            RFU('matter_receiver'),
            RFU('dialing_device'),
            RFU('destination_analyzer'),
            RFU('matter_booster'),
            RFU('simple_dialer'),
            RFU('charged_porter'),
            RFU('advanced_charged_porter'),
            RFU('environmental_controller'),
            RFU('spawner'),
            RFU('matter_beamer'),
            RFU('crafting_card'),
        ]
    })
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

    //event.replaceInput({}, IE('sawblade'), 'thermal:saw_blade')
    //event.remove({ output: IE('sawblade') })
}

function extendedCraftingSetup(event) {
    //event.remove({
    //    mod: 'extendedcrafting', not: {
    //        id: [
    //            EC('ultimate_singularity'),
    //            EC('handheld_table'),
    //            /extendedcrafting:.*_uncraft/,
    //            /extendedcrafting:.*_recraft/,
    //            /extendedcrafting:.*_block/
    //        ]
    //    }
    //})
    [
        /extendedcrafting:.*_component/,
        /extendedcrafting:.*_catalyst/,
        /extendedcrafting:.*_table/,
        EC('ender_star'),
        EC('black_iron_slate'),
        EC('black_iron_ingot'),
        EC('luminessence'),
        EC('crystaltine_ingot'),
        EC('enhanced_ender_ingot'),
        EC('ender_ingot'),
        EC('ender_star'),
        EC('redstone_ingot'),
        EC('ender_crafter'),
        EC('ender_alternator'),
        EC('compressor'),
        EC('crafting_core'),
        EC('pedestal'),
        EC('frame'),
    ].forEach(value => {
        event.remove({ id: value })
    })

    event.shaped(EC('handheld_table'), [
        ' T',
        'S '
    ], {
        T: MC('crafting_table'),
        S: F('#rods/wooden')
    })

    const crafting_components = [
        ['basic', F('#ingots/iron'), true],
        ['advanced', F('#ingots/gold'), true],
        ['elite', F('#gems/diamond'), true],
        ['ultimate', F('#gems/emerald'), true],
        ['redstone', F('#dusts/redstone'), false],
        ['ender', F('#ingots/enderium'), false],
        ['enhanced_ender', null, false],
        ['crystaltine', null, false],
        ['the_ultimate', null, false],
    ]

    for (let i = 0; i < crafting_components.length; i++) {
        let current = crafting_components[i]
        let previous = i > 0 ? crafting_components[i - 1] : null

        if (current[1] != null) {
            event.shapeless(EC(`${current[0]}_component`), [
                current[1],
                F('#plates/steel')
            ])

            event.shaped(EC(`${current[0]}_catalyst`), [
                'CC',
                'CC'
            ], {
                C: EC(`${current[0]}_component`)
            })

            if (current[2] == true) {
                event.shaped(EC(`${current[0]}_table`), [
                    'OAO',
                    'ATA',
                    'OAO'
                ], {
                    O: EC(`${current[0]}_component`),
                    A: EC(`${current[0]}_catalyst`),
                    T: previous != null ? EC(`${previous[0]}_table`) : MC('crafting_table')
                })

                event.shaped(EC(`${current[0]}_auto_table`), [
                    ' P ',
                    'RTR',
                    ' E '
                ], {
                    P: 'ae2:logic_processor',
                    R: EC('redstone_catalyst'),
                    E: EC('ender_catalyst'),
                    T: EC(`${current[0]}_table`)
                })
            }
        }
    }
}

function jetpacks(event) {
    event.remove({ mod: 'ironjetpacks' })
    //event.remove({ id: /ironjetpacks:.*/ })
    event.remove({ mod: 'mekanism', output: /mekanism:.*jetpack.*/ })
    event.remove({ output: MEK('module_jetopack_unit') })

    const crafting_components = [
        ['iron', F('#ingots/iron'), MEK('basic_control_circuit')],
        ['steel', F('#ingots/steel'), MEK('advanced_control_circuit')],
        ['diamond', F('#gems/diamond'), MEK('elite_control_circuit')],
        ['emerald', F('#gems/emerald'), MEK('ultimate_control_circuit')],
    ]

    for (let i = 0; i < crafting_components.length; i++) {
        let current = crafting_components[i]
        let previous = i > 0 ? crafting_components[i - 1] : null

        event.shaped(Item.of('ironjetpacks:capacitor', `{Id:"ironjetpacks:${current[0]}"}`), [
            'MMM',
            'EEE',
            'MMM'
        ], {
            M: current[1],
            E: MEK('energy_tablet')
        })

        if (previous != null) {  // higher tier jetpacks
            event.shaped(Item.of('ironjetpacks:jetpack', `{Id:"ironjetpacks:${current[0]}",Throttle:1.0d}`), [
                'MCM',
                'MJM',
                'MBM'
            ], {
                M: current[1],
                C: current[2],
                J: Item.of('ironjetpacks:jetpack', `{Id:"ironjetpacks:${previous[0]}",Throttle:1.0d}`),
                B: Item.of('ironjetpacks:capacitor', `{Id:"ironjetpacks:${current[0]}"}`)
            })

        } else {  // first tier jetpack
            event.shaped(Item.of('ironjetpacks:jetpack', '{Id:"ironjetpacks:iron",Throttle:1.0d}'), [
                'SCS',
                'MBM',
                ' M '
            ], {
                S: 'create_dd:steel_ingot',
                C: current[2],
                M: current[1],
                B: Item.of('ironjetpacks:capacitor', `{Id:"ironjetpacks:${current[0]}"}`)
            })
        }
    }
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
        S: IE('sawblade'),
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

function wireless(event) {
    event.remove({ mod: 'fluxnetworks' })
    event.remove({ mod: 'createendertransmission' })
    event.remove({ mod: 'enderchests' })
    event.remove({ mod: 'endertanks' })

    event.recipes.extendedcrafting.shaped_table('fluxnetworks:flux_block', [
        '  D  ',
        ' DOD ',
        'DODOD',
        ' DOD ',
        '  D  ',
    ], {
        D: 'fluxnetworks:flux_dust',
        O: MC('obsidian')
    })

    event.remove({ output: 'ironfurnaces:item_heater' })
    event.shaped('ironfurnaces:item_heater', [
        'SDS',
        'DPD',
        'SDS'
    ], {
        S: F('#stone'),
        D: 'fluxnetworks:flux_dust',
        P: 'ae2:fluix_pearl'
    })

    event.recipes.extendedcrafting.shaped_table('createendertransmission:energy_transmitter', [
        'DDSDD',
        'DEMED',
        'DEFED',
        'DEMED',
        'DDSDD',
    ], {
        D: 'fluxnetworks:flux_dust',
        S: 'create:shaft',
        E: MC('ender_pearl'),
        F: 'ae2:fluix_pearl',
        M: 'create_things_and_misc:vibration_mechanism'
    })
    event.recipes.extendedcrafting.shaped_table('createendertransmission:chunk_loader', [
        '  D  ',
        ' DOD ',
        'DOBOD',
        ' DOD ',
        '  D  ',
    ], {
        D: 'fluxnetworks:flux_dust',
        O: MC('obsidian'),
        B: MC('beacon')
    })

    event.recipes.extendedcrafting.shaped_table('fluxnetworks:flux_plug', [
        ' DSD ',
        'CCFS ',
        ' DSD ',
    ], {
        D: 'fluxnetworks:flux_dust',
        C: MEK('ultimate_universal_cable'),
        F: 'ae2:fluix_pearl',
        S: F('#plates/steel')
    }).noMirror().noShrink()
    event.recipes.extendedcrafting.shaped_table('fluxnetworks:flux_point', [
        ' DSD ',
        ' SFCC',
        ' DSD ',
    ], {
        D: 'fluxnetworks:flux_dust',
        C: MEK('ultimate_universal_cable'),
        F: 'ae2:fluix_pearl',
        S: F('#plates/steel')
    }).noMirror().noShrink()

    event.recipes.extendedcrafting.shaped_table('fluxnetworks:flux_controller', [
        'BSSSB',
        'SDFDS',
        'SFCFS',
        'SDFDS',
        'BSSSB',
    ], {
        D: 'fluxnetworks:flux_dust',
        C: MEK('ultimate_control_circuit'),
        F: 'ae2:fluix_pearl',
        S: F('#plates/steel'),
        B: 'fluxnetworks:flux_block'
    })

    event.recipes.extendedcrafting.shaped_table('fluxnetworks:basic_flux_storage', [
        ' SSS ',
        'GDDDG',
        'GDEDG',
        'GDDDG',
        ' SSS ',
    ], {
        D: 'fluxnetworks:flux_dust',
        E: MEK('basic_energy_cube'),
        S: F('#plates/steel'),
        G: F('#glass/colorless')
    })
    event.recipes.extendedcrafting.shaped_table('fluxnetworks:herculean_flux_storage', [
        ' SSS ',
        'GEEEG',
        'GDFDG',
        'GEEEG',
        ' SSS ',
    ], {
        D: 'fluxnetworks:flux_dust',
        E: 'fluxnetworks:basic_flux_storage',
        S: F('#plates/steel'),
        G: F('#glass/colorless'),
        F: 'ae2:fluix_pearl'
    })
    event.recipes.extendedcrafting.shaped_table('fluxnetworks:gargantuan_flux_storage', [
        ' SBS ',
        'GEEEG',
        'GFFFG',
        'GEEEG',
        ' SBS ',
    ], {
        E: 'fluxnetworks:herculean_flux_storage',
        S: F('#plates/steel'),
        G: F('#glass/colorless'),
        F: 'ae2:fluix_pearl',
        B: 'fluxnetworks:flux_block'
    })

    event.shaped('fluxnetworks:flux_configurator', [
        ' DF',
        ' BD',
        'B  '
    ], {
        D: 'fluxnetworks:flux_dust',
        F: 'ae2:fluix_pearl',
        B: 'fluxnetworks:flux_block'
    })

    event.shaped('endertanks:ender_bucket', [
        ' S ',
        'RBR',
        ' R '
    ], {
        S: F('#string'),
        R: MC('rabbit_hide'),
        B: 'endertanks:ender_tank'
    })
    event.shaped('enderchests:ender_bag', [
        ' S ',
        'RBR',
        ' R '
    ], {
        S: F('#string'),
        R: MC('rabbit_hide'),
        B: 'enderchests:ender_chest'
    })
    event.shaped('enderchests:ender_bag', [
        ' S ',
        'RBR',
        ' R '
    ], {
        S: F('#string'),
        R: MC('rabbit_hide'),
        B: 'enderchests:ender_chest'
    })
    event.shaped('enderchests:ender_pouch', [
        ' S ',
        'RBR',
        ' R '
    ], {
        S: F('#string'),
        R: MC('rabbit_hide'),
        B: MC('ender_chest')
    })

    event.shaped('endertanks:ender_tank', [
        'PUP',
        'BOB',
        'PBP'
    ], {
        P: MC('ender_pearl'),
        B: 'fluxnetworks:flux_block',
        O: 'enderchests:ender_pouch',
        U: F('#buckets/empty')
    })
    event.shaped('enderchests:ender_chest', [
        'PCP',
        'BOB',
        'PBP'
    ], {
        P: MC('ender_pearl'),
        B: 'fluxnetworks:flux_block',
        O: 'enderchests:ender_pouch',
        C: F('#chests/wooden')
    })
}

function waystones(event) {
    event.remove({ output: 'waystones:warp_dust' })
    event.remove({ output: 'waystones:warp_stone' })

    event.shapeless('2x waystones:warp_dust', [F('#dusts/ender_pearl'), 'fluxnetworks:flux_dust'])
    event.shaped('waystones:warp_stone', [
        ' D ',
        'DAD',
        ' D '
    ], {
        D: 'waystones:warp_dust',
        A: MC('amethyst_shard')
    })

    event.remove({ output: 'waystones:waystone' })
    event.remove({ output: 'waystones:mossy_waystone' })
    event.remove({ output: 'waystones:sandy_waystone' })

    event.shaped('waystones:waystone', [
        ' S ',
        'DBD'
    ], {
        S: 'waystones:warp_stone',
        D: 'waystones:warp_dust',
        B: MC('smooth_stone')
    })
    event.shaped('waystones:sandy_waystone', [
        ' S ',
        'DBD'
    ], {
        S: 'waystones:warp_stone',
        D: 'waystones:warp_dust',
        B: MC('smooth_sandstone')
    })
    event.shapeless('waystones:mossy_waystone', [
        'waystones:waystone',
        [MC('vine'), MC('moss_block')]
    ])

    event.remove({ output: 'waystones:sharestone' })
    event.shapeless('waystones:sharestone', [MC('water_bucket'), '#waystones:dyed_sharestone'])
        .replaceIngredient({ item: Item.of(MC('water_bucket')) }, MC('bucket'))
    event.shapeless('waystones:sharestone', 'waystones:waystone')
    event.shapeless('waystones:waystone', 'waystones:sharestone')

    event.remove({ output: 'waystones:warp_plate' })
    event.shapeless('waystones:warp_plate', [MC('stone_pressure_plate'), 'waystones:warp_stone'])

    event.remove({ output: 'waystones:portstone' })
    event.shapeless('waystones:portstone', [MC('smooth_stone'), 'waystones:warp_stone'])

    event.remove({ output: 'waystones:return_scroll' })
    event.remove({ output: 'waystones:bound_scroll' })
    event.remove({ output: 'waystones:warp_scroll' })
    event.shapeless('waystones:return_scroll', ['ars_nouveau:blank_parchment', 'waystones:warp_dust'])
    event.shapeless('waystones:bound_scroll', ['ars_nouveau:blank_parchment', 'waystones:warp_dust', 'waystones:warp_dust'])
    event.shapeless('waystones:warp_scroll', ['ars_nouveau:blank_parchment', 'waystones:warp_stone'])
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

    event.remove({ output: 'reliquary:emperor_chalice' })
    event.shaped('reliquary:emperor_chalice', [
        'GSG',
        ' G '
    ], {
        G: F('#ingots/gold'),
        S: 'bloodmagic:watersigil'
    })

    event.remove({ id: /reliquary:alkahestry.*/ })

    event.replaceInput({ id: 'reliquary:fertile_essence' }, MC('green_dye'), TE('phytogro'))

    event.remove({ output: 'reliquary:wraith_node' })
    event.remove({ output: 'reliquary:fortune_coin' })

    event.shaped('reliquary:fortune_coin', [
        ' G ',
        'GMG',
        ' G '
    ], {
        G: F('#ingots/gold'),
        M: 'simplemagnets:advancedmagnet'
    })

    event.remove({ output: 'tiab:time_in_a_bottle' })
    event.shaped('reliquary:fortune_coin', [
        ' S ',
        'SCS',
        ' B '
    ], {
        S: 'ars_nouveau:source_gem_block',
        C: MC('clock'),
        B: MC('glass_bottle')
    })

    event.remove({ output: 'utilitix:linked_crystal' })
}

function redstone_circuits(event) {

    event.custom({
        "type": "tconstruct:melting",
        "ingredient": {
            "item": MC('redstone')
        },
        "result": {
            "fluid": TE('redstone'),
            "amount": 100
        },
        "temperature": 300,
        "time": 10
    });

    event.custom({
        "type": "tconstruct:melting",
        "ingredient": {
            "item": MC('redstone_block')
        },
        "result": {
            "fluid": TE('redstone'),
            "amount": 900
        },
        "temperature": 500,
        "time": 90
    });

    event.remove({ input: PR_C('plate') })
    event.remove({ mod: 'projectred_illumination' })
    event.shapeless(PR_C('platformed_plate'), [PR_C('plate'), PR_T('red_alloy_wire'), CR("andesite_alloy")])

    let convert = (c, id) => {
        event.shapeless(PR_I(c + "_inverted" + id), [PR_I(c + id)])
        event.shapeless(PR_I(c + id), [PR_I(c + "_inverted" + id)])
    }

    colours.forEach(c => {
        event.shaped(PR_I(c + '_illumar_lamp', 1), [
            'G',
            'C',
            'S'
        ], {
            G: F('#glass/colorless'),
            C: PR_C(c + '_illumar'),
            S: MC('redstone')
        })

        event.stonecutting(PR_I(c + '_fixture_light', 4), PR_I(c + '_illumar_lamp'))
        event.stonecutting(PR_I(c + '_fallout_light', 4), PR_I(c + '_illumar_lamp'))
        event.stonecutting(PR_I(c + '_lantern', 4), PR_I(c + '_illumar_lamp'))
        event.stonecutting(PR_I(c + '_cage_light', 4), PR_I(c + '_illumar_lamp'))
        event.stonecutting(PR_I(c + '_inverted_fixture_light', 4), PR_I(c + '_inverted_illumar_lamp'))
        event.stonecutting(PR_I(c + '_inverted_fallout_light', 4), PR_I(c + '_inverted_illumar_lamp'))
        event.stonecutting(PR_I(c + '_inverted_lantern', 4), PR_I(c + '_inverted_illumar_lamp'))
        event.stonecutting(PR_I(c + '_inverted_cage_light', 4), PR_I(c + '_inverted_illumar_lamp'))

        convert(c, '_illumar_lamp')
        convert(c, '_fallout_light')
        convert(c, '_lantern')
        convert(c, '_cage_light')
        convert(c, '_fixture_light')
    })

    let circuit = (id) => {
        event.remove({ output: id })
        event.stonecutting(Item.of(id, 1), PR_C('platformed_plate'))
    }

    let p_circuit = (id) => circuit("projectred_integration:" + id + "_gate")

    circuit(MC("repeater"))
    circuit(MC("comparator"))
    circuit(CR("pulse_repeater"))
    circuit(CR("pulse_extender"))
    circuit(CR("powered_latch"))
    circuit(CR("powered_toggle_latch"))
    circuit(RFU('analog'))
    circuit(RFU('counter'))
    circuit(RFU('digit'))
    circuit(RFU('invchecker'))
    circuit(RFU('sensor'))
    circuit(RFU('sequencer'))
    circuit(RFU('logic'))
    circuit(RFU('timer'))

    event.remove({ output: RFU('wire') })
    event.remove({ output: RFU('redstone_receiver') })
    event.remove({ output: RFU('redstone_transmitter') })
    event.shaped(RFU('redstone_receiver'), [
        'L',
        'C'
    ], {
        L: CR('redstone_link'),
        C: MEK('basic_control_circuit')
    })
    event.shaped(RFU('redstone_transmitter'), [
        'C',
        'L'
    ], {
        L: CR('redstone_link'),
        C: MEK('basic_control_circuit')
    })

    p_circuit("or")
    p_circuit("nor")
    p_circuit("not")
    p_circuit("and")
    p_circuit("nand")
    p_circuit("xor")
    p_circuit("xnor")
    p_circuit("buffer")
    p_circuit("multiplexer")
    p_circuit("pulse")
    p_circuit("repeater")
    p_circuit("randomizer")
    p_circuit("sr_latch")
    p_circuit("toggle_latch")
    p_circuit("transparent_latch")
    p_circuit("light_sensor")
    p_circuit("rain_sensor")
    p_circuit("timer")
    p_circuit("sequencer")
    p_circuit("counter")
    p_circuit("state_cell")
    p_circuit("synchronizer")
    p_circuit("bus_transceiver")
    p_circuit("null_cell")
    p_circuit("invert_cell")
    p_circuit("buffer_cell")
    p_circuit("comparator")
    p_circuit("and_cell")
    p_circuit("bus_randomizer")
    p_circuit("bus_converter")
    p_circuit("bus_input_panel")
    p_circuit("segment_display")
    p_circuit("dec_randomizer")
}

function extendedMechanicalCrafting(event) {
    event.forEachRecipe({ type: CR('mechanical_crafting') }, raw_recipe => {
        const recipe = Utils.mapOf(raw_recipe.json)
        console.log(recipe)

        console.log('preparing recipe key')
        let key = {}
        for (const [kkey, kvalue] of Object.entries(recipe.key)) {
            key[kkey + ''] = Ingredient.of(kvalue)
        }

        console.log('adding recipe')
        const new_r_id = 'kubejs:mechanical_to_extended/' + `${raw_recipe.getOrCreateId()}`.replace(':', '/')
        event.recipes.extendedcrafting.shaped_table(Ingredient.of(recipe.result),
            recipe.pattern.map(row => {
                return row + ''
            }),
            key
        ).id(new_r_id)
        console.log(new_r_id)
    })
}