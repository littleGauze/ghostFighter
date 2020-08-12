const { ccclass, property } = cc._decorator
import Player from './Player'

@ccclass
export default class Game extends cc.Component {

  @property(cc.TiledMap)
  map: cc.TiledMap = null

  private _player: Player = null

  onLoad(): void {
    const pm: cc.PhysicsManager = cc.director.getPhysicsManager()
    pm.enabled = true
    this._player = this.node.getComponentInChildren(Player)

    const cm: cc.CollisionManager = cc.director.getCollisionManager()
    cm.enabled = true

  }

  start() {
  }

  update (dt: number) {

  }
}
