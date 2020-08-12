export enum State {
  Stand = 1,
  Walk,
  Attack
}

export enum Direction {
  None = 0,
  Left = -1,
  Right = 1
}

export interface CParams {
  speed?: number,
  anim: cc.Animation,
  rgd: cc.RigidBody
}

export enum Action {
  Stand = 'idle',
  Walk = 'walk',
  Attack = 'attack1',
  Attack2 = 'attack2',
  Attack3 = 'attack3'
}