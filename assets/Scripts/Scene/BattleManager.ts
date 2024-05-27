import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator
import { TileMapManager } from '../Tile/TileMapManager'

@ccclass('BattleManager')
export class BattleManager extends Component {
  start() {
    this.generateTileMap()
  }

  generateTileMap() {
    const stage = new Node()
    stage.parent = this.node
    const tileMap = new Node()
    tileMap.parent = stage
    const tileMapManager = tileMap.addComponent(TileMapManager)
    tileMapManager.init()
  }
}
