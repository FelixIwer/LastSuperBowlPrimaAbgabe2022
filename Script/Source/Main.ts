namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  
  let plattform: ƒ.Node;
  let graph: ƒ.Graph;
  let parentMain: ƒ.Node;

  let hero: ƒ.Node;
  let heroRB: ƒ.ComponentRigidbody;
  let movingScript: MovingScript;

  let bgMusic: ƒ.ComponentAudio;
  let bgMusicPlaying: boolean = true;

  interface Camera {
    translateX: number;
    translateY: number;
    translateZ:  number;
    rotateY: number;
  }

  export let cameraData: Camera;

  // document.addEventListener("interactiveViewportStarted", <EventListener>start);
  window.addEventListener("load", <any>start);

  async function start(_event: Event): Promise<void> {
    
    await FudgeCore.Project.loadResourcesFromHTML();
    await getJsonData();
    graph = <ƒ.Graph>ƒ.Project.resources["Graph|2022-07-20T05:46:49.943Z|14997"];

    plattform = graph.getChildrenByName("Plattform")[0];
    generateCG(plattform, ƒ.COLLISION_GROUP.GROUP_2);

    parentMain = graph;

    hero = graph.getChildrenByName("Hero")[0];
    heroRB = hero.getComponent(ƒ.ComponentRigidbody);
    heroRB.effectRotation = new ƒ.Vector3(0, 0, 0);

    heroRB.addEventListener(ƒ.EVENT_PHYSICS.TRIGGER_ENTER, hndPhysics, true);

    movingScript = new MovingScript(hero, heroRB);

    loadCamera();

    ƒ.AudioManager.default.listenTo(graph);
    ƒ.AudioManager.default.listenWith(graph.getComponent(ƒ.ComponentAudioListener));

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    bgMusic = getcmpAudio("StadiumBackground");
    bgMusic.play(bgMusicPlaying);
  }

  function update(_event: Event): void {


    if (hero.mtxLocal.translation.y < -5) {
      gameOver();
    }

    if (GameState.get().gameRunning){
      document.querySelector("#StartGame").setAttribute("hidden", "true");
      movingScript.act();

      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.M])) {
        bgMusicPlaying = !bgMusicPlaying;
      }
      if (bgMusicPlaying) {
        bgMusic.volume = 1;
      } else {
        bgMusic.volume = 0;
      }    
    } else if (!GameState.get().gameRunning) {
      newGame();
      document.querySelector("#StartGame").removeAttribute("hidden");
    }

    ƒ.Physics.simulate();
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function loadCamera(): void {
    let cmpCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateX(cameraData.translateX);
    cmpCamera.mtxPivot.translateY(cameraData.translateY);
    cmpCamera.mtxPivot.translateZ(cameraData.translateZ);
    cmpCamera.mtxPivot.rotateY(cameraData.rotateY);

    graph.addComponent(cmpCamera);

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);
  }

  function generateCG(node: ƒ.Node, collisionGroup: ƒ.COLLISION_GROUP) {
    for (let n of node.getChildren()) {
      let nodeRB = n.getComponent(ƒ.ComponentRigidbody);
      nodeRB.collisionGroup = collisionGroup;
    }
  }

  function newGame(): void {
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.R])) {
      GameState.get().gameRunning = true;
      spawnFootball();
      GameState.get().ingameScore = 0;
    }
  }

  async function getJsonData(): Promise<void> {
    let cameraDataRaw: Response = await fetch("Script/Source/Data/testData.json");
    cameraData = JSON.parse(await cameraDataRaw.text());
  }

  function getcmpAudio(name: string): ƒ.ComponentAudio {

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

  async function spawnFootball(): Promise<void> {

    let coinFootball: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2022-07-20T05:28:19.336Z|80106"];

    let startPos = new ƒ.Vector3(Math.random() * 20, Math.random() * 6, 1);

    let FootballInstance = await ƒ.Project.createGraphInstance(coinFootball);

    FootballInstance.mtxLocal.translation = startPos;
    graph.addChild(FootballInstance);
  }

  function hndPhysics(_event: ƒ.EventPhysics) {
    if (GameState.get().gameRunning) {
      let parents: ƒ.Node = _event.cmpRigidbody.node;
      parents = graph.getChildrenByName("Collectable")[0];
      for (const node of parents.getIterator()) {
        if (node.getComponent(ƒ.ComponentRigidbody)) {
          node.removeComponent(node.getComponent(ƒ.ComponentRigidbody));
        }
        node.activate(false);
      };
      graph.removeChild(parents);
      spawnFootball();

      if (parents.name == "Collectable") {
        let cmpAudio: ƒ.ComponentAudio = getcmpAudio("CoinSound");
        cmpAudio.play(true);
        GameState.get().ingameScore += 100;
      }
    }
  }

  function gameOver(): void {
    GameState.get().gameRunning = false;
    document.getElementById("StartGame").innerHTML = "You Lose! <br>" + "Your Score: " + GameState.get().ingameScore + "<br>Press R to restart. ";
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.R])) {
      location.reload();
    }
  }

}