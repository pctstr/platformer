// ============================================================
//  LEVEL 2: Temple (last level — has a finish zone)
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

    // ---- platforms ----
    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.add.tileSprite(-20, 224, 360, 16, 'stone').setOrigin(0,0));

    const platData = [
      [20, 200, 64], [120, 190, 80], [240, 200, 64],
      [60, 160, 64], [180, 150, 80],
      [100, 120, 64], [220, 110, 80],
      [40, 80, 64], [160, 70, 80],
      [120, 40, 80],
      // goal platform at top-right
      [260, 50, 60],
    ];
    for (const [x,y,w] of platData) {
      this.platforms.add(this.add.tileSprite(x, y, w, 16, 'stone').setOrigin(0,0));
    }
    this.platforms.refresh();

    // ---- player (MUST be created before goal overlap) ----
    // expand world bounds so the player can walk left back to Jungle (x < -20)
    this.physics.world.setBounds(-20, 0, 360, 240);
    this.setupPlayer(this.startX, this.startY);
    this.physics.add.collider(this.player, this.platforms);

    // ---- goal (finish flag) on top-right platform ----
    this.goal = this.physics.add.staticSprite(290, 38, 'goal');
    this.physics.add.overlap(this.player, this.goal, () => this.win(null), null, this);

    // ---- coins ----
    this.coins = this.physics.add.staticGroup();
    const coinPos = [
      [44,184],[160,174],           // над нижними (y=200/190)
      [90,144],[220,134],           // над средними (y=160/150)
      [130,104],[260,94]            // над верхними (y=120/110)
    ];
    this.createCoins(this.coins, coinPos);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

  }

  update() {
    if (this.gameWon) return;
    this.setupControls();
    this.checkFall();
    this.checkEdgeTransition(null, 'Jungle');
    this.statusText.setText('');
  }
}