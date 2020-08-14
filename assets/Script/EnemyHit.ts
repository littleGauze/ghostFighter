const { ccclass, property } = cc._decorator
import { State, Action, Direction } from './Consts'
import Enemy from './Enemy'

@ccclass
export default class EnemyHit extends cc.Component {

  private _enemy: Enemy = null

  onLoad() {
    this._enemy = this.node.parent.getComponent(Enemy)
  }

  onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
    // weapon demage
    if (other.tag === 2 && self.tag === 1 && other.size.width) {
      this._enemy.demage(1)
    }
  }
}
