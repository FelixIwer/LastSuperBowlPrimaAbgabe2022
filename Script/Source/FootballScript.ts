namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class FootballScript extends ƒ.ComponentScript {
      // Register the script as component for use in the editor via drag&drop
      public static readonly iSubclass: number = ƒ.Component.registerSubclass(FootballScript);
      // Properties may be mutated by users in the editor via the automatically created user interface
      public message: string = "FootballScript added to ";


      constructor() {
          super();
    
          // Don't start when running in editor
          if (ƒ.Project.mode == ƒ.MODE.EDITOR)
            return;
    
          // Listen to this component being added to or removed from a node
          this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
        }

        // Activate the functions of this component as response to events
  public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Debug.log(this.message, this.node);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
      }
    }
  }
}