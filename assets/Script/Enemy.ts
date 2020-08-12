const { ccclass, property } = cc._decorator
import Character from './Character'
import { State, Action } from './Consts'

@ccclass
export default class Enemy extends Character {

  private anim: cc.Animation = null
  private rgd: cc.RigidBody = null

  onLoad() {
    this.rgd = this.node.getComponent(cc.RigidBody)
    this.anim = this.node.getComponentInChildren(cc.Animation)
  }


  start() {
    super.init({
      speed: 50,
      anim: this.anim,
      rgd: this.rgd
    });

    setTimeout(() => this.ready(), 2000)
  }

  public ready(): void {
    this.moveRight()
    this.setState(State.Walk)
  }

  public update(dt: number): void {
    super._update(dt)
  }
}
