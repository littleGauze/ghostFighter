import { State, Direction, CParams, Action } from './Consts'

export default class Charater extends cc.Component {

  private _speed: number = 200
  private _anim: cc.Animation = null
  private _state: State = State.Stand
  private _rgd: cc.RigidBody = null
  private _dir: Direction = Direction.None
  private _action: Action = Action.Stand
  private _default: CParams = null

  public hpLabel: cc.Label = null
  public hp: number = 0

  protected init(params: CParams): void {
    this._default = params
    this._speed = params.speed || this._speed
    this._anim = params.anim
    this._rgd = params.rgd
    this.hp = params.hp

    // listen animation
    this._anim.on(cc.Animation.EventType.FINISHED, this.onAnimFinshed, this)
  }

  public restart(): void {
    this.hp = this._default.hp
    this._state = State.Stand
    this.hpLabel.string = ` hp: ${this.hp} `
  }

  public onAnimFinshed(type: string, state: cc.AnimationState): void {
    if (type === 'finished' && /^attack/.test(state.name)) {
      this.setState(State.Stand)
      this.setAnim(Action.Stand)
    }
  }

  public move(dir: Direction, dt): void {
    this._rgd.linearVelocity = cc.v2(dir * this._speed, 0)
  }

  public moveLeft(): void {
    this._dir = Direction.Left
    this._state = State.Walk
    const n: cc.Node = this.node.getChildByName('body')
    n.scaleX = -Math.abs(n.scaleX)
  }

  public moveRight(): void {
    this._dir = Direction.Right
    this._state = State.Walk
    const n: cc.Node = this.node.getChildByName('body')
    n.scaleX = Math.abs(n.scaleX)
  }

  public attack(): void {
    if (this._state === State.Dead) return
    this._state = State.Attack
    this.setAnim(Action.Attack)
  }

  public _update(dt: number): void {
    if (this._state === State.Dead) return
    if (this._state === State.Stand) {
      this.setAnim(Action.Stand)
    } else if (this._state === State.Walk) {
      this.setAnim(Action.Walk)
      this.move(this._dir, dt)
    }
  }

  public setAnim(name: string): void {
    if (name === this._action) return
    this._action = name as Action
    this._anim.play(name)
  }

  public stop(): void {
    this._state = State.Stand
    this.setAnim(Action.Stand)
  }

  public get state(): State {
    return this._state
  }

  public get isDead(): boolean {
    return this._state === State.Dead
  }

  public setState(state: State): void {
    this._state = state
  }

  public demage(d: number): void {
    if (this.hp <= 0) return
    this.hp -= d
    this.hpLabel.string = ` hp: ${this.hp} `
    if (this.hp <= 0) {
      this._state = State.Dead
    }
  }
}
