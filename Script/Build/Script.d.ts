declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class FootballScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class GameState extends ƒ.Mutable {
        private static controller;
        private static instance;
        gameRunning: boolean;
        ingameScore: number;
        name: string;
        private constructor();
        static get(): GameState;
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class HeroScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        ctrForward: ƒ.Control;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    interface Camera {
        translateX: number;
        translateY: number;
        translateZ: number;
        rotateY: number;
    }
    export let cameraData: Camera;
    export {};
}
declare namespace Script {
    import ƒ = FudgeCore;
    class MovingScript {
        private inAir;
        private hero;
        private heroRB;
        private heroDampT;
        private heroMesh;
        constructor(hero: ƒ.Node, heroRB: ƒ.ComponentRigidbody);
        act(): void;
    }
}
