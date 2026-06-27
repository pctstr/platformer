// ============================================================
//  MAIN — Phaser config and entry point
// ============================================================
import { JungleLevel } from './levels/jungle.js';
import { TempleLevel } from './levels/temple.js';

export const VERSION = '1.0.118';

const GW = 320, GH = 240;

const config = {
  type: Phaser.AUTO,
  width: GW,
  height: GH,
  parent: 'game-container',
  pixelArt: true,
  input: { activePointers: 3 },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 480 }, debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [JungleLevel, TempleLevel],
};

new Phaser.Game(config);