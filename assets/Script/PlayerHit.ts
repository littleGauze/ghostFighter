const { ccclass, property } = cc._decorator
import { State, Action, Direction } from './Consts'
import Player from './Player'

@ccclass
export default class PlayerHit extends cc.Component {

  private _player: Player = null

  onLoad() {
    this._player = this.node.parent.getComponent(Player)
  }

  onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
    // weapon demage
    if (other.tag === 2 && self.tag === 1 && other.size.width) {
      this._player.demage(1)
    }
  }
}
