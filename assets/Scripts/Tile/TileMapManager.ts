import { _decorator, assert, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc'
const { ccclass, property } = _decorator
import Levels from '../../Levels'

const TILE_WIDTH = 55
const TILE_HEIGHT = 55

@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init() {
    const { mapInfo } = Levels[`level${1}`]
    const spriteFrames = await this.loadRes()
    console.log(spriteFrames)
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i]
      for (let j = 0; j < column.length; j++) {
        const tile = column[j]
        if (tile.src === null || tile.type === null) {
          continue
        }

        const node = new Node()
        const sprite = node.addComponent(Sprite)
        const imgSrc = `tile (${tile.src})`
        sprite.spriteFrame = spriteFrames.find(item => item.name === imgSrc) || spriteFrames[0]

        const transform = node.addComponent(UITransform)
        transform.setContentSize(TILE_WIDTH, TILE_HEIGHT)

        node.layer = 1 << Layers.nameToLayer('UI_2D')
        node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)

        node.setParent(this.node)
      }
    }
  }

  loadRes() {
    return new Promise<SpriteFrame[]>((resolve, reject) => {
      resources.loadDir('texture/tile/tile', SpriteFrame, (err, asserts) => {
        if (err) {
          reject(err)
        } else {
          resolve(asserts)
        }
      })
    })
  }
}
