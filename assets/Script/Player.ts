const { ccclass, property } = cc._decorator
import Character from './Character'
import { State, Action } from './Consts'

@ccclass
export default class Player extends Character {

  @property(cc.Label)
  hpLabel: cc.Label = null

  private anim: cc.Animation = null
  private rgd: cc.RigidBody = null
  private _comb: number = 0
  private _combAction: Array<Action> = [ Action.Attack, Action.Attack2, Action.Attack3 ]
  private _combInterval: number = 0.4
  private _combTimer: number = 0

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    this.rgd = this.node.getComponent(cc.RigidBody)
    this.anim = this.node.getComponentInChildren(cc.Animation)
  }

  start() {
    super.init({
      speed: 200,
      anim: this.anim,
      rgd: this.rgd,
      hp: 10
    });
  }

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  public onKeyDown(evt: cc.Event.EventKeyboard): void {
    if (evt.keyCode === cc.macro.KEY.a) {
      this.moveLeft()
    } else if (evt.keyCode === cc.macro.KEY.d) {
      this.moveRight()
    } else if (evt.keyCode === cc.macro.KEY.j) {
      this.attack()
    }
  }

  public onKeyUp(evt: cc.Event.EventKeyboard): void {
    if (this.state === State.Walk) {
      this.setState(State.Stand)
      this.setAnim(Action.Stand)
    }
  }

  public onAnimFinshed(type: string, state: cc.AnimationState): void {
    console.log('finished anim ', type, state.name)
    if (type === 'finished' && /^attack/.test(state.name)) {
      this._comb = (this._comb + 1) % 3
      this.setState(State.Stand)
    }
  }

  onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider): void {
    console.log('come in..........')
    console.log(other, self)
  }

  public attack(): void {
    this.setState(State.Attack)
  }

  public demage(d: number): void {
    super.demage(d)
    if (this.isDead) {
      cc.director.loadScene('game')
    }
  }

  public update(dt: number): void {
    if (this.isDead) return
    if (this.state === State.Stand) {
      if (this._combTimer < this._combInterval) {
        this._combTimer += dt
      } else {
        this._comb = 0
        this._combTimer = 0
      }
    }
    if (this.state === State.Attack) {
      this.setAnim(this._combAction[this._comb])
    } else {
      super._update(dt)
    }
  }
}
