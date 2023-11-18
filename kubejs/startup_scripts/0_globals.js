// priority: 99

let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let MC = (id, x) => MOD("minecraft", id, x)
let AP = (id, x) => MOD("architects_palette", id, x)
let ENV = (id, x) => MOD("environmental", id, x)
let AQU = (id, x) => MOD("upgrade_aquatic", id, x)
let TIC = (id, x) => MOD("tconstruct", id, x)
let ATM = (id, x) => MOD("atmospheric", id, x)
let AUT = (id, x) => MOD("autumnity", id, x)
let QRK = (id, x) => MOD("quark", id, x)
let BYG = (id, x) => MOD("byg", id, x)
let BOP = (id, x) => MOD("biomesoplenty", id, x)
let TWB = (id, x) => MOD("wildbackport", id, x)
let ECO = (id, x) => MOD("ecologics", id, x)
let ITA = (id, x) => MOD("italian_delight", id, x)

let wood_types = [
    [MC, "oak"],
    [MC, "spruce"],
    [MC, "birch"],
    [MC, "jungle"],
    [MC, "acacia"],
    [MC, "dark_oak"],
    [AP, "twisted"],
    [ENV, "willow"],
    [ENV, "cherry"],
    [ENV, "wisteria"],
    [AQU, "driftwood"],
    [AQU, "river"],
    [TIC, "greenheart"],
    [TIC, "skyroot"],
    [TIC, "bloodshroom"],
    [ATM, "rosewood"],
    [ATM, "morado"],
    [ATM, "yucca"],
    [ATM, "aspen"],
    [AUT, "maple"],
    [QRK, "blossom"],
    [QRK, "azalea"]
]

global.wood_types = {}

wood_types.forEach(type => {

    global.wood_types[type] = {}

    // LOG
    global.wood_types[type].log = type[0](type[1] + "_log")

    // STRIPPED LOG
    if (type[0] != ITA) {
        if (type[0] == ECO && type[1] == "flowering_azalea") {
            global.wood_types[type].stripped_log = type[0]("stripped_azalea_log")
        } else {
            global.wood_types[type].stripped_log = type[0]("stripped_" + type[1] + "_log")
        }
    }

    // WOOD
    if (type[0] != ITA) {
        if (type[1].endsWith("wood") && type[0] != BYG && type[0] != BOP) {
            global.wood_types[type].wood = type[0](type[1])
        } else {
            global.wood_types[type].wood = type[0](type[1] + "_wood")
        }
    }

    // STRIPPED WOOD
    if (type[0] != ITA) {
        if (type[0] == ECO && type[1] == "flowering_azalea") {
            global.wood_types[type].stripped_wood = type[0]("stripped_azalea_wood")
        } else if (type[1].endsWith("wood") && type[0] != BYG && type[0] != BOP) {
            global.wood_types[type].stripped_wood = type[0]("stripped_" + type[1])
        } else {
            global.wood_types[type].stripped_wood = type[0]("stripped_" + type[1] + "_wood")
        }
    }

})