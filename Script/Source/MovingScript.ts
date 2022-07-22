namespace Script{
    import ƒ = FudgeCore;
    let ctrForward: ƒ.Control = new ƒ.Control("Forward", 30, ƒ.CONTROL_TYPE.PROPORTIONAL);
    ctrForward.setDelay(10);


    export class MovingScript{

        private inAir: boolean;
        private hero: ƒ.Node;
        private heroRB: ƒ.ComponentRigidbody;
        private heroDampT: number;
        private heroMesh: ƒ.ComponentMesh;

        constructor(hero: ƒ.Node, heroRB: ƒ.ComponentRigidbody){
            this.hero = hero;
            this.heroRB = heroRB;
            this.heroDampT = heroRB.dampTranslation;
            this.heroMesh = this.hero.getComponent(ƒ.ComponentMesh);
        }

        public act(){
            this.inAir = false;
            let direction = ƒ.Vector3.Y(-1);
            let heroTrans = this.hero.mtxWorld.translation.clone;
            heroTrans.x += (this.heroMesh.mtxPivot.scaling.x / 2 - 0.02) * - Math.cos(this.heroMesh.mtxPivot.rotation.y * Math.PI  / 180);
            let ray = ƒ.Physics.raycast(heroTrans, direction, 0.5, true, ƒ.COLLISION_GROUP.GROUP_2);
            if (ray.hit) {
              this.heroRB.dampTranslation = this.heroDampT;
              this.inAir = true;
            }
        
            let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT], [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]);
            ctrForward.setInput(forward);
            this.heroRB.applyForce(ƒ.Vector3.X(ctrForward.getOutput()));
        
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE,ƒ.KEYBOARD_CODE.W]) && this.inAir) {
                this.heroRB.setVelocity(new ƒ.Vector3(this.heroRB.getVelocity().x, 8, this.heroRB.getVelocity().z))
            }

        }
    }
}