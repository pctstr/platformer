// ============================================================
//  LEVEL 1: Jungle
// ============================================================
import { BaseLevel } from './base.js';

export class JungleLevel extends BaseLevel {
  constructor() {
    super('Jungle');
  }

  create() {
    super.create();
    this.cameras.main.setBackgroundColor(0x8ab88a);

    // parallax background
    const far = this.add.graphics().setScrollFactor(0.3).setDepth(0);
    far.fillStyle(0x5a8a5a);
    far.fillRect(0, 180, 320, 60);
    far.fillStyle(0x6a9a6a);
    far.fillRect(0, 170, 320, 10);

    const mid = this.add.graphics().setScrollFactor(0.6).setDepth(1);
    for (let i = 0; i < 8; i++) {
      const tx = i * 45 + 10;
      mid.fillStyle(0x4a3a2a);
      mid.fillRect(tx, 140, 8, 80);
      mid.fillStyle(0x4a8a4a);
      mid.fillRect(tx-6, 130, 20, 16);
      mid.fillRect(tx-4, 120, 16, 12);
    }

    const near = this.add.graphics().setScrollFactor(0.9).setDepth(2);
    for (let i = 0; i < 12; i++) {
      const tx = i * 30 + 5;
      near.fillStyle(0x5a9a5a);
      near.fillRect(tx, 200, 12, 8);
      near.fillRect(tx+4, 196, 8, 6);
    }

    // platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.add.tileSprite(0, 224, 320, 16, 'ground').setOrigin(0,0));

    const platData = [
      [20, 200, 64], [100, 190, 80], [220, 200, 64],
      [40, 160, 64], [140, 150, 80], [240, 160, 64],
      [80, 120, 64], [180, 110, 80], [280, 120, 64],
      [120, 80, 64], [220, 70, 80],
      [160, 40, 80],
    ];
    for (const [x,y,w] of platData) {
      this.platforms.add(this.add.tileSprite(x, y, w, 16, 'platform').setOrigin(0,0));
    }
    this.platforms.refresh();

    // vines
    const vines = this.add.graphics().setScrollFactor(0.8).setDepth(3);
    for (let i = 0; i < 6; i++) {
      const vx = i * 55 + 20;
      vines.fillStyle(0x3a6a3a);
      vines.fillRect(vx, 100, 4, 120);
      vines.fillStyle(0x4a8a4a);
      vines.fillRect(vx+1, 100, 1, 120);
    }

    this.setupPlayer(40, 200);
    this.physics.add.collider(this.player, this.platforms);

    this.coins = this.physics.add.staticGroup();
    const coinPos = [
      [40,180],[60,180],[160,130],[200,130],[100,100],[140,100],
      [200,90],[240,90],[180,60],[200,60]
    ];
    for (const [x,y] of coinPos) {
      this.coins.add(this.physics.add.staticSprite(x+4, y+4, 'coin'));
    }
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

    this.goal = this.physics.add.staticSprite(200, 20, 'goal');
    this.physics.add.overlap(this.player, this.goal, () => this.win('Temple'), null, this);
  }

  update() {
    if (this.gameWon) return;
    this.setupControls();
    this.checkEdgeTransition('Temple', null);
    this.statusText.setText('');
  }
}