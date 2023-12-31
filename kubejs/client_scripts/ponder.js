onEvent("ponder.tag", event => {
    event.createTag("kubejs:multiblock", "thermal:iron_gear", "Multi-block structures", "Assemble it yourself!", [
        "minecraft:obsidian",
        "minecraft:conduit"
    ])
})


onEvent("ponder.registry", event => {
    event.create("minecraft:obsidian").scene("nether_portal", "Getting to the Nether", "kubejs:nether_portal", (scene, util) => {
        scene.showBasePlate()
        scene.world.showSection([4, 1, 3, 1, 1, 3], Facing.DOWN);
        scene.world.showSection([4, 1, 3, 4, 5, 3], Facing.DOWN);
        scene.world.showSection([1, 1, 3, 1, 5, 3], Facing.DOWN);
        scene.world.showSection([4, 5, 3, 1, 5, 3], Facing.DOWN);

        scene.idle(10)
        scene.text(120, "This is a Nether portal.", [2.5, 2.5, 3])
        scene.idle(40)
        scene.text(80, "This is its minimum size, but it can be built wider and taller.", [2.5, 1.9, 3])

        scene.idle(90)
        scene.text(40, "When you light it...", [3, 2.5, 3])
        scene
            .showControls(40, [3, 2.5, 3], "down")
            .rightClick()
            .withItem("minecraft:flint_and_steel")

        scene.idle(50)
        scene.world.showSection([3, 4, 3, 2, 2, 3], Facing.DOWN);
        scene.text(70, "... it becomes active.", [3, 2.5, 3])


        scene.idle(90)
        scene.addKeyframe()
        const piglin = scene.world.createEntity("piglin", [2.5, 1, 2]);
        scene.text(80, "Be warned, mobs can travel through the portal as well!", [2.5, 2, 2])
            .colored(PonderPalette.RED)

        scene.idle(80)
        scene.world.removeEntity(piglin)

        scene.idle(20)
        scene.addKeyframe()
        scene.text(40, "To deactivate the portal...", [3, 2.5, 3])

        scene.idle(50)
        scene.text(100, "... you can either use a bucket...", [3, 2.5, 3])
        scene
            .showControls(80, [3, 3, 3], "down")
            .rightClick()
            .withItem("minecraft:water_bucket")
        scene.idle(40)
        scene.world.replaceBlocks([3, 4, 3, 2, 2, 3], "minecraft:air", true);
        scene.world.setBlock([3, 2, 3], "minecraft:water", false)
        scene.text(60, "(which will spill water everywhere)", [3, 1.8, 3])
            .colored(PonderPalette.RED)

        scene.idle(70)
        scene.world.hideSection([3, 4, 3, 2, 2, 3], Facing.UP);
        scene.idle(20)
        scene.world.setBlocks([3, 4, 3, 2, 2, 3], "minecraft:nether_portal", false);
        scene.world.showSection([3, 4, 3, 2, 2, 3], Facing.DOWN);

        scene.idle(10)
        scene.text(80, "... or you can damage the frame.", [3, 3, 3])
        scene
            .showControls(100, [3, 1, 3], "right")
            .leftClick()
            .withItem("minecraft:diamond_pickaxe")
        scene.idle(40)
        scene.world.setBlocks([3, 4, 3, 2, 2, 3], "minecraft:air", true);
        scene.world.setBlock([3, 1, 3], "minecraft:air", true);

        scene.idle(90)
        scene.world.hideSection([4, 5, 3, 1, 1, 3], Facing.UP);
        scene.idle(20)
        scene.world.setBlocks([4, 5, 3, 1, 1, 3], "minecraft:obsidian", false);
        scene.world.setBlocks([3, 4, 3, 2, 2, 3], "minecraft:nether_portal", false);
        scene.world.showSection([4, 5, 3, 1, 1, 3], Facing.DOWN);

        scene.idle(10)
        scene.addKeyframe()
        scene.idle(20)
        scene.world.setBlock([4, 1, 3], "minecraft:air", true);
        scene.text(80, "The portal will function without corner blocks.", [2.5, 2.5, 3])
        scene.idle(20)
        scene.world.setBlock([1, 1, 3], "minecraft:air", true);
        scene.idle(20)
        scene.world.setBlock([1, 5, 3], "minecraft:air", true);
        scene.idle(20)
        scene.world.setBlock([4, 5, 3], "minecraft:air", true);

        scene.idle(50)
        scene.markAsFinished()

    })

    event.create(["minecraft:obsidian", "minecraft:crying_obsidian"]).scene("ruined_portals", "Ruined portals", "kubejs:ruined_portal", (scene, util) => {
        scene.showStructure()
        scene.scaleSceneView(0.65)
        scene.setSceneOffsetY(-1)

        scene.text(70, "Ruined portals can sometimes be found around the world.", [4, 5.5, 6.5])
        scene.idle(80)
        scene.text(120, "Crying Obsidian must be replaced with regular Obisidan before the portal can be activated.", [4.5, 4.5, 6.5])
        scene.idle(60)
        scene.world.setBlock([4, 4, 6], "minecraft:obsidian", true)

        scene.idle(60)
        scene.world.setBlock([7, 5, 6], "minecraft:obsidian", true)
        scene.world.setBlocks([7, 6, 6, 4, 6, 6], "minecraft:obsidian", true)
        scene.idle(20)
        scene
            .showControls(30, [6.5, 3, 6.5], "down")
            .rightClick()
            .withItem("minecraft:flint_and_steel")

        scene.idle(30)
        scene.world.setBlocks([6, 3, 6, 5, 5, 6], "minecraft:nether_portal", false)

    })

    event.create("minecraft:conduit").scene("conduit_structure", "Staying safe underwater", "kubejs:conduit_structure", (scene, util) => {
        scene.showStructure()
        scene.scaleSceneView(0.65)
        scene.setSceneOffsetY(-2)

        scene.idle(10)
        scene.text(60, "The conduit is a helpful tool underwater.", [4.5, 4.5, 4.5])

        scene.idle(70)
        scene.world.hideSection([2, 2, 2, 6, 6, 6], Facing.UP)
        scene.idle(20)
        scene.world.setBlocks([2, 2, 2, 6, 6, 6], "minecraft:air", false)
        scene.world.setBlock([4, 4, 4], Block.id("minecraft:conduit").with("waterlogged", "false"), false)
        scene.world.showSection([4, 4, 4, 4, 4, 4], Facing.DOWN)


        scene.world.setBlocks([6, 6, 4, 2, 6, 4], "minecraft:prismarine", false)
        scene.world.setBlock([6, 5, 4], "minecraft:prismarine", false)
        scene.world.setBlock([6, 4, 4], "minecraft:prismarine", false)
        scene.world.setBlock([6, 3, 4], "minecraft:prismarine", false)
        scene.world.setBlock([2, 5, 4], "minecraft:prismarine", false)
        scene.world.setBlock([2, 4, 4], "minecraft:prismarine", false)
        scene.world.setBlock([2, 3, 4], "minecraft:prismarine", false)
        scene.world.setBlocks([6, 2, 4, 2, 2, 4], "minecraft:prismarine", false)
        scene.addKeyframe()
        scene.text(60, "When underwater...", [4.5, 4.5, 4.5])
        scene.idle(40)
        scene.world.showSection([6, 6, 4, 2, 6, 4], Facing.DOWN)
        scene.world.showSection([6, 5, 4, 6, 5, 4], Facing.DOWN)
        scene.world.showSection([6, 4, 4, 6, 4, 4], Facing.DOWN)
        scene.world.showSection([6, 3, 4, 6, 3, 4], Facing.DOWN)
        scene.world.showSection([2, 5, 4, 2, 5, 4], Facing.DOWN)
        scene.world.showSection([2, 4, 4, 2, 4, 4], Facing.DOWN)
        scene.world.showSection([2, 3, 4, 2, 3, 4], Facing.DOWN)
        scene.world.showSection([6, 2, 4, 2, 2, 4], Facing.DOWN)
        scene.text(60, "... and surrounded by at least 16 prismarine blocks...", [2, 3.5, 4])
        scene.idle(60)
        scene.text(60, "... it gives players in a 16 block radius Conduit Power.", [4.5, 4.5, 4.5])
        scene.idle(60)
        scene.world.setBlocks([4, 6, 6, 4, 6, 2], "minecraft:prismarine", false)
        scene.world.setBlock([4, 5, 6], "minecraft:prismarine", false)
        scene.world.setBlock([4, 4, 6], "minecraft:prismarine", false)
        scene.world.setBlock([4, 3, 6], "minecraft:prismarine", false)
        scene.world.setBlock([4, 5, 2], "minecraft:prismarine", false)
        scene.world.setBlock([4, 4, 2], "minecraft:prismarine", false)
        scene.world.setBlock([4, 3, 2], "minecraft:prismarine", false)
        scene.world.setBlocks([4, 2, 6, 4, 2, 2], "minecraft:prismarine", false)
        scene.world.setBlock([2, 4, 3], "minecraft:prismarine", false)
        scene.world.setBlock([2, 4, 5], "minecraft:prismarine", false)
        scene.world.showSection([4, 6, 6, 4, 6, 2], Facing.DOWN)
        scene.world.showSection([4, 5, 6, 4, 5, 6], Facing.DOWN)
        scene.world.showSection([4, 4, 6, 4, 4, 6], Facing.DOWN)
        scene.world.showSection([4, 3, 6, 4, 3, 6], Facing.DOWN)
        scene.world.showSection([4, 5, 2, 4, 5, 2], Facing.DOWN)
        scene.world.showSection([4, 4, 2, 4, 4, 2], Facing.DOWN)
        scene.world.showSection([4, 3, 2, 4, 3, 2], Facing.DOWN)
        scene.world.showSection([4, 2, 6, 4, 2, 2], Facing.DOWN)
        scene.addKeyframe()
        scene.text(120, "The radius of the conduit gets increased by 16 blocks everytime you add 16 blocks to the structure.", [4.5, 6.5, 6.5])
        scene.idle(120)
        scene.world.setBlocks([6, 4, 2, 2, 4, 2], "minecraft:prismarine", false)
        scene.world.setBlocks([6, 4, 6, 2, 4, 6], "minecraft:prismarine", false)
        scene.world.setBlocks([2, 4, 2, 2, 4, 6], "minecraft:prismarine", false)
        scene.world.setBlocks([6, 4, 2, 6, 4, 6], "minecraft:prismarine", false)
        scene.world.showSection([6, 4, 2, 2, 4, 2], Facing.DOWN)
        scene.world.showSection([6, 4, 6, 2, 4, 6], Facing.DOWN)
        scene.world.showSection([2, 4, 2, 2, 4, 6], Facing.DOWN)
        scene.world.showSection([6, 4, 2, 6, 4, 6], Facing.DOWN)
        scene.addKeyframe()
        scene.text(60, "This is the completed structure.", [2, 6.5, 4])
        scene.idle(40)
        scene.text(120, "It must:", [2, 5.5, 4])
            .colored(PonderPalette.RED)
        scene.idle(20)
        scene.text(100, "- be fully submerged", [2, 4.7, 4])
        scene.idle(20)
        scene.text(80, "- not contain any other blocks", [2, 3.9, 4])

        scene.idle(90)
        scene.text(140, "It can be made from:", [2, 6.5, 4.5])
        scene.idle(20)
        scene.text(120, "- Prismarine", [2, 5.5, 4.5])
        scene.idle(20)
        scene.world.setBlock([2, 4, 4], "minecraft:prismarine_bricks", true)
        scene.text(100, "- Prismarine Bricks", [2, 4.5, 4.5])
        scene.idle(20)
        scene.world.setBlock([2, 3, 4], "minecraft:dark_prismarine", true)
        scene.text(80, "- Dark Prismarine", [2, 3.5, 4.5])
        scene.idle(20)
        scene.world.setBlock([2, 2, 4], "minecraft:sea_lantern", false)
        scene.text(60, "- Sea Lanterns", [2, 2.5, 4.5])

        scene.idle(70)
        scene.addKeyframe()
        scene.text(80, "When containing all 42 blocks like this, it also attacks hostile mobs within 8 blocks of itself.", [4.5, 4.5, 4.5])

        scene.idle(90)
        scene.markAsFinished()
    })


    event.create([
        "mekanism:induction_port",
        "mekanism:basic_induction_cell",
        "mekanism:basic_induction_provider",
        "mekanism:advanced_induction_cell",
        "mekanism:advanced_induction_provider",
        "mekanism:elite_induction_cell",
        "mekanism:elite_induction_provider",
        "mekanism:ultimate_induction_cell",
        "mekanism:ultimate_induction_provider",
    ]).scene("induction_matrix", "Induction matrix", "kubejs:induction_matrix", (scene, util) => {
        scene.showBasePlate()
        scene.showStructure()


        scene.text(60, "This is an induction matrix", [3, 4, 3])
        scene.idle(70)
        scene.text(80, "Think of it as a large battery that can store thousands of GFE", [3, 4, 3])
        scene.idle(90)

        scene.world.hideSection([1, 1, 1, 4, 3, 4], Facing.UP)
        scene.idle(15)
        scene.world.setBlocks([1, 1, 1, 4, 3, 4], "minecraft:air", false);

        // pillars
        scene.world.setBlocks([1, 1, 1, 1, 3, 1], 'mekanism:induction_casing', false)
        scene.world.setBlocks([1, 1, 4, 1, 3, 4], 'mekanism:induction_casing', false)
        scene.world.setBlocks([4, 1, 1, 4, 3, 1], 'mekanism:induction_casing', false)
        scene.world.setBlocks([4, 1, 4, 4, 3, 4], 'mekanism:induction_casing', false)
        // bottom square
        scene.world.setBlocks([1, 1, 1, 4, 1, 1], 'mekanism:induction_casing', false)
        scene.world.setBlocks([1, 1, 1, 1, 1, 4], 'mekanism:induction_casing', false)
        scene.world.setBlocks([4, 1, 4, 4, 1, 1], 'mekanism:induction_casing', false)
        scene.world.setBlocks([4, 1, 4, 1, 1, 4], 'mekanism:induction_casing', false)
        // top square
        scene.world.setBlocks([1, 3, 1, 4, 3, 1], 'mekanism:induction_casing', false)
        scene.world.setBlocks([1, 3, 1, 1, 3, 4], 'mekanism:induction_casing', false)
        scene.world.setBlocks([4, 3, 4, 4, 3, 1], 'mekanism:induction_casing', false)
        scene.world.setBlocks([4, 3, 4, 1, 3, 4], 'mekanism:induction_casing', false)

        scene.world.showSection([1, 1, 1, 4, 3, 4], Facing.DOWN)
        scene.addKeyframe()
        scene.idle(20)

        scene.text(70, "The base structure has to be built out of induction casings", [1, 2.5, 4.5])
        scene.idle(80)

        scene.world.setBlocks([2, 1, 2, 3, 1, 3], 'mekanism:induction_casing', true)
        scene.world.setBlocks([4, 2, 2, 4, 2, 3], 'mekanism:structural_glass', true)
        scene.world.setBlocks([1, 2, 2, 1, 2, 3], 'mekanism:structural_glass', true)
        scene.world.setBlocks([3, 2, 1, 2, 2, 1], 'mekanism:structural_glass', true)
        scene.world.setBlocks([3, 2, 4, 2, 2, 4], 'mekanism:structural_glass', true)
        scene.world.setBlocks([2, 3, 2, 3, 3, 3], 'mekanism:structural_glass', true)

        scene.idle(10)
        scene.text(70, "The walls may however be built out of structural glass aswell", [1, 2.5, 3])
        scene.idle(80)

        scene.addKeyframe()
        scene.world.hideSection([1, 3, 1, 4, 3, 4], Facing.UP)
        scene.idle(10)

        scene.text(40, "For the structure to work...", [3, 3, 3])
        scene.idle(50)

        scene.world.setBlock([2, 2, 2], "mekanism:basic_induction_cell", true)
        scene.text(60, "you need at least one induction cell and...", [2.5, 2.5, 2.5])
        scene.idle(70)

        scene.world.setBlock([3, 2, 3], "mekanism:basic_induction_provider", true)
        scene.text(50, "at least one induction provider", [3.5, 2.5, 3.5])
        scene.idle(70)

        scene.text(40, "Empty blocks are allowed", [2.5, 2.5, 3.5])
        scene.idle(50)

        scene.addKeyframe()
        scene.idle(10)

        const tiers = [
            'advanced',
            'elite',
            'ultimate',
            'basic'
        ]
        const time_per_tier = 20

        scene.text(time_per_tier * tiers.length, "You can use any tier you want, but higher is better", [3, 3, 3])
        scene.idle(time_per_tier)
        tiers.forEach(tier => {
            scene.world.setBlock([2, 2, 2], `mekanism:${tier}_induction_cell`, false)
            scene.world.setBlock([3, 2, 3], `mekanism:${tier}_induction_provider`, false)
            scene.idle(time_per_tier)
        })

        scene.addKeyframe()
        scene.world.showSection([1, 3, 1, 4, 3, 4], Facing.DOWN)
        scene.idle(20)

        scene.world.setBlock([2, 2, 1], 'mekanism:induction_port', true)
        scene.text(50, "Use induction ports for input and output", [2.5, 2.5, 1]).placeNearTarget()
        scene.idle(60)

        scene.text(70, "The mode must be set with a configurator", [2.5, 2.5, 1]).placeNearTarget()
        scene.showControls(70, [2.5, 3, 1], "down")
            .rightClick()
            .whileSneaking()
            .withItem('mekanism:configurator')

        const toggle = [
            true,
            false,
            true
        ]
        toggle.forEach(state => {
            scene.idle(20)
            scene.world.modifyBlock([2, 2, 1], (curState) => curState.with("active", state), false);
        })
    })

})