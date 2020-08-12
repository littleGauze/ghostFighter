import { State, Direction, CParams, Action } from './Consts'

export default class Charater extends cc.Component {

  private _speed: number = 200
  private _anim: cc.Animation = null
  private _state: State = State.Stand
  private _rgd: cc.RigidBody = null
  private _dir: Direction = Direction.None
  private _action: Action = Action.Stand

  protected init(params: CParams): void {
    this._speed = params.speed || this._speed
    this._anim = params.anim
    this._rgd = params.rgd

    // listen animation
    this._anim.on(cc.Animation.EventType.FINISHED, this.onAnimFinshed, this)
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
    this.node.scaleX = -Math.abs(this.node.scaleX)
  }

  public moveRight(): void {
    this._dir = Direction.Right
    this._state = State.Walk
    this.node.scaleX = Math.abs(this.node.scaleX)
  }

  public attack(): void {
    this._state = State.Attack
    this.setAnim(Action.Attack)
  }

  public _update(dt: number): void {
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

  public get state(): State {
    return this._state
  }

  public setState(state: State): void {
    this._state = state
  }
}
