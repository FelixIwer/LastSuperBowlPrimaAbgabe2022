"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        constructor() {
            super();
            // Properties may be mutated by users in the editor via the automatically created user interface
            this.message = "CustomComponentScript added to ";
            // Activate the functions of this component as response to events
            this.hndEvent = (_event) => {
                switch (_event.type) {
                    case "componentAdd" /* COMPONENT_ADD */:
                        ƒ.Debug.log(this.message, this.node);
                        break;
                    case "componentRemove" /* COMPONENT_REMOVE */:
                        this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                        this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                        break;
                    case "nodeDeserialized" /* NODE_DESERIALIZED */:
                        // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                        break;
                }
            };
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
    }
    // Register the script as component for use in the editor via drag&drop
    CustomComponentScript.iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class FootballScript extends ƒ.ComponentScript {
        constructor() {
            super();
            // Properties may be mutated by users in the editor via the automatically created user interface
            this.message = "FootballScript added to ";
            // Activate the functions of this component as response to events
            this.hndEvent = (_event) => {
                switch (_event.type) {
                    case "componentAdd" /* COMPONENT_ADD */:
                        ƒ.Debug.log(this.message, this.node);
                        break;
                    case "componentRemove" /* COMPONENT_REMOVE */:
                        this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                        this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                        break;
                }
            };
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
    }
    // Register the script as component for use in the editor via drag&drop
    FootballScript.iSubclass = ƒ.Component.registerSubclass(FootballScript);
    Script.FootballScript = FootballScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒui = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        constructor() {
            super();
            this.gameRunning = false;
            this.ingameScore = 0;
            this.name = "LastSuperBowl";
            let domUI = document.querySelector("#UI");
            GameState.instance = this;
            GameState.controller = new ƒui.Controller(this, domUI);
        }
        static get() {
            return GameState.instance || new GameState();
        }
        reduceMutator(_mutator) { }
    }
    Script.GameState = GameState;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class HeroScript extends ƒ.ComponentScript {
        constructor() {
            super();
            // Properties may be mutated by users in the editor via the automatically created user interface
            this.message = "HeroScript added to ";
            this.ctrForward = new ƒ.Control("Forward", 1, 0 /* PROPORTIONAL */);
            // Activate the functions of this component as response to events
            this.hndEvent = (_event) => {
                switch (_event.type) {
                    case "componentAdd" /* COMPONENT_ADD */:
                        ƒ.Debug.log(this.message, this.node);
                        break;
                    case "componentRemove" /* COMPONENT_REMOVE */:
                        this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                        this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                        break;
                }
            };
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
    }
    // Register the script as component for use in the editor via drag&drop
    HeroScript.iSubclass = ƒ.Component.registerSubclass(HeroScript);
    Script.HeroScript = HeroScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let plattform;
    let graph;
    let parentMain;
    let hero;
    let heroRB;
    let movingScript;
    let bgMusic;
    let bgMusicPlaying = true;
    // document.addEventListener("interactiveViewportStarted", <EventListener>start);
    window.addEventListener("load", start);
    async function start(_event) {
        await FudgeCore.Project.loadResourcesFromHTML();
        await getJsonData();
        graph = ƒ.Project.resources["Graph|2022-07-20T05:46:49.943Z|14997"];
        plattform = graph.getChildrenByName("Plattform")[0];
        generateCG(plattform, ƒ.COLLISION_GROUP.GROUP_2);
        parentMain = graph;
        hero = graph.getChildrenByName("Hero")[0];
        heroRB = hero.getComponent(ƒ.ComponentRigidbody);
        heroRB.effectRotation = new ƒ.Vector3(0, 0, 0);
        heroRB.addEventListener("TriggerEnteredCollision" /* TRIGGER_ENTER */, hndPhysics, true);
        movingScript = new Script.MovingScript(hero, heroRB);
        loadCamera();
        ƒ.AudioManager.default.listenTo(graph);
        ƒ.AudioManager.default.listenWith(graph.getComponent(ƒ.ComponentAudioListener));
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        bgMusic = getcmpAudio("StadiumBackground");
        bgMusic.play(bgMusicPlaying);
    }
    function update(_event) {
        if (hero.mtxLocal.translation.y < -5) {
            gameOver();
        }
        if (Script.GameState.get().gameRunning) {
            document.querySelector("#StartGame").setAttribute("hidden", "true");
            movingScript.act();
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.M])) {
                bgMusicPlaying = !bgMusicPlaying;
            }
            if (bgMusicPlaying) {
                bgMusic.volume = 1;
            }
            else {
                bgMusic.volume = 0;
            }
        }
        else if (!Script.GameState.get().gameRunning) {
            newGame();
            document.querySelector("#StartGame").removeAttribute("hidden");
        }
        ƒ.Physics.simulate();
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function loadCamera() {
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateX(Script.cameraData.translateX);
        cmpCamera.mtxPivot.translateY(Script.cameraData.translateY);
        cmpCamera.mtxPivot.translateZ(Script.cameraData.translateZ);
        cmpCamera.mtxPivot.rotateY(Script.cameraData.rotateY);
        graph.addComponent(cmpCamera);
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
    }
    function generateCG(node, collisionGroup) {
        for (let n of node.getChildren()) {
            let nodeRB = n.getComponent(ƒ.ComponentRigidbody);
            nodeRB.collisionGroup = collisionGroup;
        }
    }
    function newGame() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.R])) {
            Script.GameState.get().gameRunning = true;
            spawnFootball();
            Script.GameState.get().ingameScore = 0;
        }
    }
    async function getJsonData() {
        let cameraDataRaw = await fetch("Script/Source/Data/testData.json");
        Script.cameraData = JSON.parse(await cameraDataRaw.text());
    }
    function getcmpAudio(name) {
        switch (name) {
            case "CoinSound":
                return graph.getComponents(ƒ.ComponentAudio)[1];
                break;
            case "StadiumBackground":
                return graph.getComponents(ƒ.ComponentAudio)[0];
                break;
            default:
                break;
        }
        return graph.getComponents(ƒ.ComponentAudio)[1];
    }
    async function spawnFootball() {
        let coinFootball = FudgeCore.Project.resources["Graph|2022-07-20T05:28:19.336Z|80106"];
        let startPos = new ƒ.Vector3(Math.random() * 20, Math.random() * 6, 1);
        let FootballInstance = await ƒ.Project.createGraphInstance(coinFootball);
        FootballInstance.mtxLocal.translation = startPos;
        graph.addChild(FootballInstance);
    }
    function hndPhysics(_event) {
        if (Script.GameState.get().gameRunning) {
            let parents = _event.cmpRigidbody.node;
            parents = graph.getChildrenByName("Collectable")[0];
            for (const node of parents.getIterator()) {
                if (node.getComponent(ƒ.ComponentRigidbody)) {
                    node.removeComponent(node.getComponent(ƒ.ComponentRigidbody));
                }
                node.activate(false);
            }
            ;
            graph.removeChild(parents);
            spawnFootball();
            if (parents.name == "Collectable") {
                let cmpAudio = getcmpAudio("CoinSound");
                cmpAudio.play(true);
                Script.GameState.get().ingameScore += 100;
            }
        }
    }
    function gameOver() {
        Script.GameState.get().gameRunning = false;
        document.getElementById("StartGame").innerHTML = "You Lose! <br>" + "Your Score: " + Script.GameState.get().ingameScore + "<br>Press R to restart. ";
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.R])) {
            location.reload();
        }
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let ctrForward = new ƒ.Control("Forward", 30, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(10);
    class MovingScript {
        constructor(hero, heroRB) {
            this.hero = hero;
            this.heroRB = heroRB;
            this.heroDampT = heroRB.dampTranslation;
            this.heroMesh = this.hero.getComponent(ƒ.ComponentMesh);
        }
        act() {
            this.inAir = false;
            let direction = ƒ.Vector3.Y(-1);
            let heroTrans = this.hero.mtxWorld.translation.clone;
            heroTrans.x += (this.heroMesh.mtxPivot.scaling.x / 2 - 0.02) * -Math.cos(this.heroMesh.mtxPivot.rotation.y * Math.PI / 180);
            let ray = ƒ.Physics.raycast(heroTrans, direction, 0.5, true, ƒ.COLLISION_GROUP.GROUP_2);
            if (ray.hit) {
                this.heroRB.dampTranslation = this.heroDampT;
                this.inAir = true;
            }
            let forward = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT], [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]);
            ctrForward.setInput(forward);
            this.heroRB.applyForce(ƒ.Vector3.X(ctrForward.getOutput()));
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE, ƒ.KEYBOARD_CODE.W]) && this.inAir) {
                this.heroRB.setVelocity(new ƒ.Vector3(this.heroRB.getVelocity().x, 8, this.heroRB.getVelocity().z));
            }
        }
    }
    Script.MovingScript = MovingScript;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map