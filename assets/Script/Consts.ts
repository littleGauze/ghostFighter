export enum State {
  Stand = 1,
  Walk,
  Attack,
  Hurt,
  Dead
}

export enum Direction {
  None = 0,
  Left = -1,
  Right = 1
}

export interface CParams {
  speed?: number,
  anim: cc.Animation,
  rgd: cc.RigidBody,
  hp: number
}

export enum Action {
  Stand = 'idle',
  Walk = 'walk',
  Hurt = 'hurt',
  Dead = 'dead',
  Attack = 'attack',
  Attack2 = 'attack2',
  Attack3 = 'attack3'
}