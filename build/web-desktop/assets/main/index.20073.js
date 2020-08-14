window.__require=function t(e,n,o){function i(c,a){if(!n[c]){if(!e[c]){var s=c.split("/");if(s=s[s.length-1],!e[s]){var p="function"==typeof __require&&__require;if(!a&&p)return p(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+c+"'")}c=s}var u=n[c]={exports:{}};e[c][0].call(u.exports,function(t){return i(e[c][1][t]||t)},u,u.exports,t,e,n,o)}return n[c].exports}for(var r="function"==typeof __require&&__require,c=0;c<o.length;c++)i(o[c]);return i}({Character:[function(t,e,n){"use strict";cc._RF.push(e,"35b30At74FE9JJQUXFIn8U2","Character");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(n,"__esModule",{value:!0});var i=t("./Consts"),r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._speed=200,e._anim=null,e._state=i.State.Stand,e._rgd=null,e._dir=i.Direction.None,e._action=i.Action.Stand,e._default=null,e.hpLabel=null,e.hp=0,e}return o(e,t),e.prototype.init=function(t){this._default=t,this._speed=t.speed||this._speed,this._anim=t.anim,this._rgd=t.rgd,this.hp=t.hp,this._anim.on(cc.Animation.EventType.FINISHED,this.onAnimFinshed,this)},e.prototype.restart=function(){this.hp=this._default.hp,this._state=i.State.Stand,this.hpLabel.string=" hp: "+this.hp+" "},e.prototype.onAnimFinshed=function(t,e){"finished"===t&&/^attack/.test(e.name)&&(this.setState(i.State.Stand),this.setAnim(i.Action.Stand))},e.prototype.move=function(t,e){this._rgd.linearVelocity=cc.v2(t*this._speed,0)},e.prototype.moveLeft=function(){this._dir=i.Direction.Left,this._state=i.State.Walk;var t=this.node.getChildByName("body");t.scaleX=-Math.abs(t.scaleX)},e.prototype.moveRight=function(){this._dir=i.Direction.Right,this._state=i.State.Walk;var t=this.node.getChildByName("body");t.scaleX=Math.abs(t.scaleX)},e.prototype.attack=function(){this._state!==i.State.Dead&&(this._state=i.State.Attack,this.setAnim(i.Action.Attack))},e.prototype._update=function(t){this._state!==i.State.Dead&&(this._state===i.State.Stand?this.setAnim(i.Action.Stand):this._state===i.State.Walk&&(this.setAnim(i.Action.Walk),this.move(this._dir,t)))},e.prototype.setAnim=function(t){t!==this._action&&(this._action=t,this._anim.play(t))},e.prototype.stop=function(){this._state=i.State.Stand,this.setAnim(i.Action.Stand)},Object.defineProperty(e.prototype,"state",{get:function(){return this._state},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isDead",{get:function(){return this._state===i.State.Dead},enumerable:!1,configurable:!0}),e.prototype.setState=function(t){this._state=t},e.prototype.demage=function(t){this.hp<=0||(this.hp-=t,this.hpLabel.string=" hp: "+this.hp+" ",this.hp<=0&&(this._state=i.State.Dead))},e}(cc.Component);n.default=r,cc._RF.pop()},{"./Consts":"Consts"}],Consts:[function(t,e,n){"use strict";cc._RF.push(e,"cbea3keg8tEb5uGjchFbVOp","Consts"),Object.defineProperty(n,"__esModule",{value:!0}),n.Action=n.Direction=n.State=void 0,function(t){t[t.Stand=1]="Stand",t[t.Walk=2]="Walk",t[t.Attack=3]="Attack",t[t.Hurt=4]="Hurt",t[t.Dead=5]="Dead"}(n.State||(n.State={})),function(t){t[t.None=0]="None",t[t.Left=-1]="Left",t[t.Right=1]="Right"}(n.Direction||(n.Direction={})),function(t){t.Stand="idle",t.Walk="walk",t.Hurt="hurt",t.Dead="dead",t.Attack="attack",t.Attack2="attack2",t.Attack3="attack3"}(n.Action||(n.Action={})),cc._RF.pop()},{}],EnemyHit:[function(t,e,n){"use strict";cc._RF.push(e,"2f70cdEoDFGsoBjU91He+TV","EnemyHit");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,a=(r.property,t("./Enemy")),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._enemy=null,e}return o(e,t),e.prototype.onLoad=function(){this._enemy=this.node.parent.getComponent(a.default)},e.prototype.onCollisionEnter=function(t,e){2===t.tag&&1===e.tag&&t.size.width&&this._enemy.demage(1)},e=i([c],e)}(cc.Component);n.default=s,cc._RF.pop()},{"./Enemy":"Enemy"}],EnemyPools:[function(t,e,n){"use strict";cc._RF.push(e,"d6843mq/MVIyZ7rVgUkcA6H","EnemyPools"),Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,e){this._senceWidth=0,this._prefab=null,this._pools=[],this._prefab=t,this._senceWidth=e}return t.prototype.get=function(){var t=null;return(t=this._pools.length?this._pools.shift():this._generate()).setPosition(this._getRandomPos()),t},t.prototype._generate=function(){return cc.instantiate(this._prefab)},t.prototype._getRandomPos=function(){var t=100+Math.random()*(this._senceWidth-300);return cc.v2(t,500)},t.prototype.recycle=function(t){this._pools.push(t)},t}();n.default=o,cc._RF.pop()},{}],Enemy:[function(t,e,n){"use strict";cc._RF.push(e,"7f23bN/eflGJJ6ZRBo7/TtF","Enemy");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,a=r.property,s=t("./Character"),p=t("./Consts"),u=t("./Player"),h=t("./Game"),l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.hpLabel=null,e.anim=null,e.rgd=null,e._attackRange=45,e._viewRange=200,e._playerNode=null,e._player=null,e._timer=null,e._checkInterval=200,e._game=null,e._ready=!1,e}return o(e,t),e.prototype.onLoad=function(){this.rgd=this.node.getComponent(cc.RigidBody),this.anim=this.node.getComponentInChildren(cc.Animation),this._playerNode=cc.find("Canvas/background/hero"),this._game=cc.find("Canvas/background").getComponent(h.default),this._player=this._playerNode.getComponent(u.default)},e.prototype.onDestroy=function(){clearInterval(this._timer)},e.prototype.start=function(){t.prototype.init.call(this,{speed:50,anim:this.anim,rgd:this.rgd,hp:5})},e.prototype.ready=function(){var t=this;if(!this._ready){this._ready=!0;var e=setInterval(function(){t.isDead||!t._player||t._player.isDead?clearInterval(e):t.state!==p.State.Hurt&&(t.isInAttackRange?t.attack():t.isInViewRange?t.findPlayer():t.stop())},this._checkInterval)}},e.prototype.findPlayer=function(){var t=this.getPlayerDirection();t===p.Direction.Left?this.moveLeft():t===p.Direction.Right&&this.moveRight()},e.prototype.getPlayerDirection=function(){var t=this._playerNode.x;return this.node.x<t?p.Direction.Right:p.Direction.Left},e.prototype.onAnimFinshed=function(e,n){switch(t.prototype.onAnimFinshed.call(this,e,n),n.name){case p.Action.Hurt:this.setState(p.State.Stand);break;case p.Action.Dead:this._game.enemyPools.recycle(this.node),this.node.removeFromParent(!1),this.restart(),this._ready=!1,this._game.enemyCount=-1}},e.prototype.update=function(e){t.prototype._update.call(this,e)},Object.defineProperty(e.prototype,"isInViewRange",{get:function(){return cc.Vec2.distance(this._playerNode.position,this.node.position)<this._viewRange},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isInAttackRange",{get:function(){return cc.Vec2.distance(this._playerNode.position,this.node.position)<this._attackRange},enumerable:!1,configurable:!0}),e.prototype.demage=function(e){t.prototype.demage.call(this,e),this.isDead?this.setAnim(p.Action.Dead):(this.setState(p.State.Hurt),this.setAnim(p.Action.Hurt))},e.prototype.onBeginContact=function(){this.ready()},i([a(cc.Label)],e.prototype,"hpLabel",void 0),e=i([c],e)}(s.default);n.default=l,cc._RF.pop()},{"./Character":"Character","./Consts":"Consts","./Game":"Game","./Player":"Player"}],Game:[function(t,e,n){"use strict";cc._RF.push(e,"e1b90/rohdEk4SdmmEZANaD","Game");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,a=r.property,s=t("./EnemyPools"),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.map=null,e.enemyPrefab=null,e.enmeyMaxCount=3,e._enemyCount=0,e.enemyPools=null,e}return o(e,t),e.prototype.onLoad=function(){cc.director.getPhysicsManager().enabled=!0,cc.director.getCollisionManager().enabled=!0;var t=cc.find("Canvas");this.enemyPools=new s.default(this.enemyPrefab,t.width)},e.prototype.enmeyGenAi=function(){if(this._enemyCount<this.enmeyMaxCount){var t=this.enemyPools.get();this.node.addChild(t),this._enemyCount++}},Object.defineProperty(e.prototype,"enemyCount",{set:function(t){this._enemyCount+=t},enumerable:!1,configurable:!0}),e.prototype.update=function(t){this.enmeyGenAi()},i([a(cc.TiledMap)],e.prototype,"map",void 0),i([a(cc.Prefab)],e.prototype,"enemyPrefab",void 0),i([a],e.prototype,"enmeyMaxCount",void 0),e=i([c],e)}(cc.Component);n.default=p,cc._RF.pop()},{"./EnemyPools":"EnemyPools"}],PlayerHit:[function(t,e,n){"use strict";cc._RF.push(e,"fc314cYJJVHp4ICK2OKcJgw","PlayerHit");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,a=(r.property,t("./Player")),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._player=null,e}return o(e,t),e.prototype.onLoad=function(){this._player=this.node.parent.getComponent(a.default)},e.prototype.onCollisionEnter=function(t,e){2===t.tag&&1===e.tag&&t.size.width&&this._player.demage(1)},e=i([c],e)}(cc.Component);n.default=s,cc._RF.pop()},{"./Player":"Player"}],Player:[function(t,e,n){"use strict";cc._RF.push(e,"10c8cdXblJPt7v4aZ+vArCK","Player");var o=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,c=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(c=(r<3?i(c):r>3?i(e,n,c):i(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(n,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,a=r.property,s=t("./Character"),p=t("./Consts"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.hpLabel=null,e.anim=null,e.rgd=null,e._comb=0,e._combAction=[p.Action.Attack,p.Action.Attack2,p.Action.Attack3],e._combInterval=.4,e._combTimer=0,e}return o(e,t),e.prototype.onLoad=function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.rgd=this.node.getComponent(cc.RigidBody),this.anim=this.node.getComponentInChildren(cc.Animation)},e.prototype.start=function(){t.prototype.init.call(this,{speed:200,anim:this.anim,rgd:this.rgd,hp:10})},e.prototype.onDestroy=function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)},e.prototype.onKeyDown=function(t){t.keyCode===cc.macro.KEY.a?this.moveLeft():t.keyCode===cc.macro.KEY.d?this.moveRight():t.keyCode===cc.macro.KEY.j&&this.attack()},e.prototype.onKeyUp=function(t){this.state===p.State.Walk&&(this.setState(p.State.Stand),this.setAnim(p.Action.Stand))},e.prototype.onAnimFinshed=function(t,e){console.log("finished anim ",t,e.name),"finished"===t&&/^attack/.test(e.name)&&(this._comb=(this._comb+1)%3,this.setState(p.State.Stand))},e.prototype.onCollisionEnter=function(t,e){console.log("come in.........."),console.log(t,e)},e.prototype.attack=function(){this.setState(p.State.Attack)},e.prototype.demage=function(e){t.prototype.demage.call(this,e),this.isDead&&cc.director.loadScene("game")},e.prototype.update=function(e){this.isDead||(this.state===p.State.Stand&&(this._combTimer<this._combInterval?this._combTimer+=e:(this._comb=0,this._combTimer=0)),this.state===p.State.Attack?this.setAnim(this._combAction[this._comb]):t.prototype._update.call(this,e))},i([a(cc.Label)],e.prototype,"hpLabel",void 0),e=i([c],e)}(s.default);n.default=u,cc._RF.pop()},{"./Character":"Character","./Consts":"Consts"}],use_reversed_rotateTo:[function(t,e,n){"use strict";cc._RF.push(e,"d276eZf9FFG4YYq2Ywh+MVy","use_reversed_rotateTo"),cc.RotateTo._reverse=!0,cc._RF.pop()},{}]},{},["Character","Consts","Enemy","EnemyHit","EnemyPools","Game","Player","PlayerHit","use_reversed_rotateTo"]);