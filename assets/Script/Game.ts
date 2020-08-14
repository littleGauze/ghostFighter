const { ccclass, property } = cc._decorator
import Player from './Player'
import EnemyPools from './EnemyPools'

@ccclass
export default class Game extends cc.Component {

  @property(cc.TiledMap)
  map: cc.TiledMap = null

  @property(cc.Prefab)
  enemyPrefab: cc.Prefab = null

  @property
  enmeyMaxCount: number = 3

  private _enemyCount: number = 0

  public enemyPools: EnemyPools = null

  onLoad(): void {
    const pm: cc.PhysicsManager = cc.director.getPhysicsManager()
    pm.enabled = true

    const cm: cc.CollisionManager = cc.director.getCollisionManager()
    cm.enabled = true

    // init enmeyPools
    const canvas: cc.Node = cc.find('Canvas')
    this.enemyPools = new EnemyPools(this.enemyPrefab, canvas.width)
  }

  public enmeyGenAi(): void {
    if (this._enemyCount < this.enmeyMaxCount) {
      // generate enemy
      const enmey: cc.Node = this.enemyPools.get()
      this.node.addChild(enmey)
      this._enemyCount++
    }
  }

  public set enemyCount(dt: number) {
    this._enemyCount += dt
  }

  update (dt: number) {
    this.enmeyGenAi()
  }
}
