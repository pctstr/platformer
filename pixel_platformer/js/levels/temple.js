// ============================================================
//  LEVEL 2: Temple
// ============================================================
import { BaseLevel } from './base.js';

export class TempleLevel extends BaseLevel {
  constructor() {
    super('Temple');
  }

  create() {
    super.create();
    this.cameras.main.setBackgroundColor(0x2a2a3a);

    const bg = this.add.graphics().setDepth(0);
    bg.fillStyle(0x3a3a4a);
    bg.fillRect(0, 0, 320, 240);
    bg.fillStyle(0x4a4a5a);
    for (let y = 0; y < 240; y += 16) {
      const offset = (y / 16) % 2 === 0 ? 0 : 8;
      for (let x = -16 + offset; x < 320; x += 32) {
        bg.fillRect(x, y, 30, 14);
      }
    }

    const torchPositions = [[20, 180], [300, 180], [20, 100], [300, 100]];
    for (const [tx, ty] of torchPositions) {
      const torch = this.add.image(tx, ty, 'torch').setDepth(5);
      this.tweens.add({
        targets: torch,
        alpha: { from: 0.6, to: 1 },
        duration: 500,
        yoyo: true,
        repeat: -1,
      });
    }

    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.add.tileSprite(0, 224, 320, 16, 'stone').setOrigin(0,0));

    const platData = [
      [20, 200, 64], [120, 190, 80], [240, 200, 64],
      [60, 160, 64], [180, 150, 80],
      [100, 120, 64], [220, 110, 80],
      [40, 80, 64], [160, 70, 80],
      [120, 40, 80],
    ];
    for (const [x,y,w] of platData) {
      this.platforms.add(this.add.tileSprite(x, y, w, 16, 'stone').setOrigin(0,0));
    }
    this.platforms.refresh();

    this.setupPlayer(40, 200);
    this.physics.add.collider(this.player, this.platforms);

    this.coins = this.physics.add.staticGroup();
    const coinPos = [
      [40,180],[160,130],[100,100],[200,90],[80,60],[160,50]
    ];
    for (const [x,y] of coinPos) {
      this.coins.add(this.physics.add.staticSprite(x+4, y+4, 'coin'));
    }
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

  }

  update() {
    if (this.gameWon) return;
    this.setupControls();
    this.checkEdgeTransition(null, 'Jungle');
    this.statusText.setText('');
  }
}