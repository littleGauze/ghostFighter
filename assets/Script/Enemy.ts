const { ccclass, property } = cc._decorator
import Character from './Character'
import { State, Action, Direction } from './Consts'
import Player from './Player'
import Game from './Game'

@ccclass
export default class Enemy extends Character {

  @property(cc.Label)
  hpLabel: cc.Label = null

  private anim: cc.Animation = null
  private rgd: cc.RigidBody = null
  private _attackRange: number = 45
  private _viewRange: number = 200
  private _playerNode: cc.Node = null
  private _player: Player = null
  private _timer: number = null
  private _checkInterval: number = 200
  private _game: Game = null
  private _ready: boolean = false

  onLoad() {
    this.rgd = this.node.getComponent(cc.RigidBody)
    this.anim = this.node.getComponentInChildren(cc.Animation)
    this._playerNode = cc.find('Canvas/background/hero')
    this._game = cc.find('Canvas/background').getComponent(Game)
    this._player = this._playerNode.getComponent(Player)
  }

  onDestroy() {
    clearInterval(this._timer)
  }

  start() {
    super.init({
      speed: 50,
      anim: this.anim,
      rgd: this.rgd,
      hp: 5
    });
  }

  public ready(): void {
    if (this._ready) return
    this._ready = true

    // check player
    const timer: number = setInterval(() => {
      if (this.isDead || !this._player || this._player.isDead) {
        clearInterval(timer)
        return
      }
      if (this.state === State.Hurt) return
      if (this.isInAttackRange) {
        this.attack()
        return
      }

      if (this.isInViewRange) {
        // find player
        this.findPlayer()
      } else {
        // stop
        this.stop()
      }
    }, this._checkInterval)
  }

  public findPlayer(): void {
    // get player direction
    const dir: Direction = this.getPlayerDirection()
    if (dir === Direction.Left) {
      this.moveLeft()
    } else if (dir === Direction.Right) {
      this.moveRight()
    }
  }

  public getPlayerDirection(): Direction {
    const px: number = this._playerNode.x
    const ex: number = this.node.x
    return (ex < px) ? Direction.Right : Direction.Left
  }

  public onAnimFinshed(type: string, state: cc.AnimationState): void {
    super.onAnimFinshed(type, state)
    switch (state.name) {
      case Action.Hurt:
        this.setState(State.Stand)
        break
      case Action.Dead:
        this._game.enemyPools.recycle(this.node)
        this.node.removeFromParent(false)
        this.restart()
        this._ready = false
        this._game.enemyCount = -1
        break
    }
  }

  public update(dt: number): void {
    super._update(dt)
  }

  private get isInViewRange(): boolean {
    const distance = cc.Vec2.distance(this._playerNode.position, this.node.position)
    return distance < this._viewRange
  }

  private get isInAttackRange(): boolean {
    const distance = cc.Vec2.distance(this._playerNode.position, this.node.position)
    return distance < this._attackRange
  }

  public demage(d: number): void {
    super.demage(d)
    if (this.isDead) {
      this.setAnim(Action.Dead)
      return
    }
    this.setState(State.Hurt)
    this.setAnim(Action.Hurt)
  }

  onBeginContact(): void {
    this.ready()
  }
}
