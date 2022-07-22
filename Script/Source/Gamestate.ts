namespace Script {

    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;

    export class GameState extends ƒ.Mutable {

        private static controller: ƒui.Controller;
        private static instance: GameState;
        public gameRunning: boolean = false;
        public ingameScore: number = 0;
        

        public name: string = "LastSuperBowl";

        private constructor() {
            super();
            let domUI: HTMLDivElement = document.querySelector("#UI");
            GameState.instance = this;
            GameState.controller = new ƒui.Controller(this, domUI);
        }

        public static get(): GameState {
            return GameState.instance || new GameState();
        }

        protected reduceMutator(_mutator: ƒ.Mutator): void {/* */ }
    }
}