import Enemy from './Enemy'

export default class EnemyPools {

  private _senceWidth: number = 0
  private _prefab: cc.Prefab = null
  private _pools: Array<cc.Node> = []

  constructor(prefab: cc.Prefab, senceWidth: number) {
    this._prefab = prefab
    this._senceWidth = senceWidth
  }

  public get(): cc.Node {
    let node: cc.Node = null
    if (this._pools.length) {
      node = this._pools.shift()
    } else {
      node = this._generate()
    }

    // set random position
    node.setPosition(this._getRandomPos())
    
    return node
  }

  private _generate(): cc.Node {
    const enemyNode: cc.Node = cc.instantiate(this._prefab)
    return enemyNode
  }

  private _getRandomPos(): cc.Vec2 {
    const x = 100 + Math.random() * (this._senceWidth - 300)
    return cc.v2(x, 500)
  }

  public recycle(node: cc.Node): void {
    this._pools.push(node)
  }
}
