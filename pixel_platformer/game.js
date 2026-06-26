// ============================================================
//  PIXEL PLATFORMER v1.0.111 — bundled, no modules (works via file://)
// ============================================================
const GW = 320, GH = 240;

// ---- palette ----
const PAL = {
  sky1: 0x8ab88a, sky2: 0x6a9a6a,
  hill: 0x5a8a5a,
  plat: 0x4a7a4a, platT: 0x6aaa6a, platS: 0x3a5a3a,
  gnd: 0x3a5a3a, gndT: 0x5a8a5a,
  ply: 0x2a5a2a, plyH: 0x3a7a3a, plyE: 0xc8e8c8, plyP: 0x1a2a1a,
  coin: 0xc4d88c, coinG: 0xdce8b0, coinD: 0x94a86c,
  goal: 0x6aaa6a, goalI: 0x8ac88a, flagC: 0xc8e8c8,
  vine: 0x3a6a3a, vineL: 0x4a8a4a,
  tree: 0x4a3a2a, treeD: 0x3a2a1a, leaf: 0x4a8a4a, leafL: 0x5a9a5a,
  stone: 0x6a6a6a, stoneD: 0x5a5a5a, stoneL: 0x7a7a7a,
  torch: 0xd4a840, torchF: 0xe8c860, torchG: 0xa87820,
  btnBg: 0x2a5a2a, btnBd: 0x4a8a4a, txt: 0xd4e8d4,
};

function px(ctx, x, y, color) {
  if (color !== undefined) {
    ctx.fillStyle = '#' + color.toString(16).padStart(6,'0');
    ctx.fillRect(x, y, 1, 1);
  }
}

function makeTex(id, w, h, fn) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  fn(c.getContext('2d'), w, h);
  return { id, data: c };
}

const textures2d = [
  makeTex('player', 12, 24, (ctx) => {
    const rows = [
      '...HHHH...', '..HHHHHH..', '.HHHHHHHH.', '.HPPPPPPH.',
      '.HPPPPPH..', '..HHHH....', '..HHHH....', '..HHHH....',
      '.HHHHHH...', '.H.HH.H...', '.H.HH.H...', '..H..H....',
      '..H..H....', '..HHHH....', '.HHHHHH...', '..H..H....',
      '..H..H....', '..H..H....', '..H..H....', '..H..H....',
      '..H..H....', '.HH..HH...', '.HH..HH...', '..H..H....',
    ];
    for (let y=0; y<24; y++) {
      for (let x=0; x<12; x++) {
        const ch = rows[y]?.[x];
        let col;
        if (ch==='H') col=PAL.plyH; else if (ch==='P') col=PAL.ply;
        else if (ch==='E') col=PAL.plyE; else continue;
        ctx.fillStyle = '#'+col.toString(16).padStart(6,'0');
        ctx.fillRect(x, y, 1, 1);
      }
    }
    px(ctx, 4, 8, PAL.plyE); px(ctx, 7, 8, PAL.plyE);
    px(ctx, 5, 8, PAL.plyP); px(ctx, 8, 8, PAL.plyP);
  }),

  makeTex('ground', 16, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.gnd.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,16);
    ctx.fillStyle='#'+PAL.gndT.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,4);
    px(ctx,2,0,PAL.gndT); px(ctx,6,0,PAL.gndT); px(ctx,10,0,PAL.gndT); px(ctx,14,1,PAL.gndT);
  }),

  makeTex('platform', 16, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.plat.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,16);
    ctx.fillStyle='#'+PAL.platT.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,4);
    ctx.fillStyle='#'+PAL.platS.toString(16).padStart(6,'0');
    ctx.fillRect(0,0,2,16); ctx.fillRect(14,0,2,16);
    px(ctx,5,8,PAL.platS); px(ctx,11,10,PAL.platS); px(ctx,8,13,PAL.platS);
  }),

  makeTex('coin', 8, 8, (ctx) => {
    ctx.fillStyle='#'+PAL.coin.toString(16).padStart(6,'0');
    ctx.fillRect(1,0,6,1); ctx.fillRect(0,1,8,6); ctx.fillRect(1,7,6,1);
    ctx.fillStyle='#'+PAL.coinG.toString(16).padStart(6,'0'); ctx.fillRect(2,2,4,4);
    ctx.fillStyle='#'+PAL.coinD.toString(16).padStart(6,'0'); ctx.fillRect(4,3,2,3);
  }),

  makeTex('goal', 16, 24, (ctx) => {
    ctx.fillStyle='#'+PAL.goal.toString(16).padStart(6,'0'); ctx.fillRect(6,0,4,24);
    ctx.fillStyle='#'+PAL.flagC.toString(16).padStart(6,'0'); ctx.fillRect(10,2,12,10);
    ctx.fillStyle='#'+PAL.goalI.toString(16).padStart(6,'0'); ctx.fillRect(10,2,12,3);
  }),

  makeTex('vine', 4, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.vine.toString(16).padStart(6,'0'); ctx.fillRect(0,0,4,16);
    ctx.fillStyle='#'+PAL.vineL.toString(16).padStart(6,'0');
    ctx.fillRect(1,0,1,16); ctx.fillRect(3,2,1,12);
  }),

  makeTex('tree', 16, 32, (ctx) => {
    ctx.fillStyle='#'+PAL.tree.toString(16).padStart(6,'0'); ctx.fillRect(4,0,8,32);
    ctx.fillStyle='#'+PAL.treeD.toString(16).padStart(6,'0'); ctx.fillRect(4,0,2,32);
    ctx.fillStyle='#'+PAL.leaf.toString(16).padStart(6,'0');
    ctx.fillRect(0,0,4,4); ctx.fillRect(12,0,4,4);
    ctx.fillRect(0,4,16,4);
  }),

  makeTex('stone', 16, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.stone.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,16);
    ctx.fillStyle='#'+PAL.stoneL.toString(16).padStart(6,'0'); ctx.fillRect(0,0,16,2);
    ctx.fillStyle='#'+PAL.stoneD.toString(16).padStart(6,'0');
    ctx.fillRect(0,0,2,16); ctx.fillRect(14,0,2,16);
    px(ctx,5,6,PAL.stoneD); px(ctx,11,9,PAL.stoneD); px(ctx,8,12,PAL.stoneD);
  }),

  makeTex('torch', 8, 16, (ctx) => {
    ctx.fillStyle='#'+PAL.torchG.toString(16).padStart(6,'0'); ctx.fillRect(3,8,2,8);
    ctx.fillStyle='#'+PAL.torch.toString(16).padStart(6,'0');
    ctx.fillRect(2,4,4,4); ctx.fillRect(3,2,2,2);
    ctx.fillStyle='#'+PAL.torchF.toString(16).padStart(6,'0');
    ctx.fillRect(3,0,2,2);
  }),
];

function registerTextures(scene) {
  for (const t of textures2d) {
    scene.textures.addCanvas(t.id, t.data);
  }
}

// ============================================================
//  BASE LEVEL
// ============================================================
class BaseLevel extends Phaser.Scene {
  constructor(key) { super(key); }

  init(data) {
    this.coinCount = data.coinCount || 0;
    this.fromLevel = data.from || null;
    this.gameWon = false;
    this.touchLeft = false;
    this.touchRight = false;
    this.touchJump = false;
  }

  create() {
    registerTextures(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.createMobileButtons();
    this.coinText = this.add.text(6, 6, '🍀 ' + this.coinCount, { font: '13px monospace', fill: '#d4e8d4' }).setScrollFactor(0).setDepth(99);
    this.statusText = this.add.text(160, 6, '', { font: '12px monospace', fill: '#d4e8d4' }).setOrigin(0.5,0).setScrollFactor(0).setDepth(99);
    this.add.text(310, 6, 'v1.0.111', { font: '10px monospace', fill: '#6a9a6a' }).setOrigin(1,0).setScrollFactor(0).setDepth(99);
  }

  createMobileButtons() {
    const btnAlpha = 0.6;
    const btnLayer = this.add.graphics().setScrollFactor(0).setDepth(100);
    btnLayer.fillStyle(0x2a5a2a, btnAlpha);
    btnLayer.fillRoundedRect(18, 202, 36, 24, 4);
    btnLayer.fillRoundedRect(68, 202, 36, 24, 4);
    btnLayer.fillRoundedRect(250, 200, 60, 30, 4);
    btnLayer.lineStyle(1, 0x4a8a4a, 1);
    btnLayer.strokeRoundedRect(18, 202, 36, 24, 4);
    btnLayer.strokeRoundedRect(68, 202, 36, 24, 4);
    btnLayer.strokeRoundedRect(250, 200, 60, 30, 4);

    const hitL = this.add.zone(36, 214, 40, 28).setScrollFactor(0).setDepth(101).setInteractive();
    const hitR = this.add.zone(86, 214, 40, 28).setScrollFactor(0).setDepth(101).setInteractive();
    const hitJ = this.add.zone(280, 215, 64, 34).setScrollFactor(0).setDepth(101).setInteractive();

    hitL.on('pointerdown', () => this.touchLeft = true);
    hitL.on('pointerup', () => this.touchLeft = false);
    hitL.on('pointerout', () => this.touchLeft = false);
    hitR.on('pointerdown', () => this.touchRight = true);
    hitR.on('pointerup', () => this.touchRight = false);
    hitR.on('pointerout', () => this.touchRight = false);
    hitJ.on('pointerdown', () => this.touchJump = true);
    hitJ.on('pointerup', () => this.touchJump = false);
    hitJ.on('pointerout', () => this.touchJump = false);

    const txtStyle = { font: '14px monospace', fill: '#d4e8d4' };
    this.add.text(36, 214, '<', txtStyle).setOrigin(0.5).setScrollFactor(0).setDepth(102);
    this.add.text(86, 214, '>', txtStyle).setOrigin(0.5).setScrollFactor(0).setDepth(102);
    this.add.text(280, 215, 'JUMP', { font: '11px monospace', fill: '#d4e8d4', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(102);

    if (!this.sys.game.device.input.touch) {
      btnLayer.setVisible(false);
      hitL.disableInteractive(); hitL.setVisible(false);
      hitR.disableInteractive(); hitR.setVisible(false);
      hitJ.disableInteractive(); hitJ.setVisible(false);
    }
  }

  setupPlayer(x, y) {
    this.player = this.physics.add.sprite(x, y, 'player');
    this.player.setSize(10, 22);
    this.player.setOffset(1, 2);
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
  }

  setupControls() {
    const spd = 110;
    const jump = -210;
    const p = this.player;
    let mx = 0;
    if (this.cursors.left.isDown || this.wasd.A.isDown || this.touchLeft) mx = -1;
    else if (this.cursors.right.isDown || this.wasd.D.isDown || this.touchRight) mx = 1;
    p.setVelocityX(mx * spd);
    if (mx < 0) p.setFlipX(true);
    else if (mx > 0) p.setFlipX(false);
    if ((this.cursors.up.isDown || this.wasd.W.isDown || this.spaceKey.isDown || this.touchJump) && p.body.touching.down) {
      p.setVelocityY(jump);
    }
  }

  collectCoin(_, coin) {
    coin.destroy();
    this.coinCount++;
    this.coinText.setText('🍀 ' + this.coinCount);
  }

  checkEdgeTransition(nextScene, prevScene) {
    const p = this.player;
    if (p.x > 320 && nextScene) {
      this.scene.start(nextScene, { coinCount: this.coinCount, from: this.scene.key });
    }
    if (p.x < -12 && prevScene) {
      this.scene.start(prevScene, { coinCount: this.coinCount, from: this.scene.key });
    }
  }

  win(nextScene) {
    if (this.gameWon) return;
    this.gameWon = true;
    this.statusText.setText('УРОВЕНЬ ПРОЙДЕН!');
    this.statusText.setStyle({ font: '14px monospace', fill: '#8ac88a', fontStyle: 'bold' });
    this.physics.pause();
    this.time.delayedCall(1500, () => {
      this.scene.start(nextScene);
    });
  }
}

// ============================================================
//  LEVEL 1: Jungle
// ============================================================
class JungleLevel extends BaseLevel {
  constructor() { super('Jungle'); }

  create() {
    super.create();
    this.cameras.main.setBackgroundColor(0x8ab88a);

    const far = this.add.graphics().setScrollFactor(0.3).setDepth(0);
    far.fillStyle(0x5a8a5a); far.fillRect(0, 180, 320, 60);
    far.fillStyle(0x6a9a6a); far.fillRect(0, 170, 320, 10);

    const mid = this.add.graphics().setScrollFactor(0.6).setDepth(1);
    for (let i = 0; i < 8; i++) {
      const tx = i * 45 + 10;
      mid.fillStyle(0x4a3a2a); mid.fillRect(tx, 140, 8, 80);
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

    const vines = this.add.graphics().setScrollFactor(0.8).setDepth(3);
    for (let i = 0; i < 6; i++) {
      const vx = i * 55 + 20;
      vines.fillStyle(0x3a6a3a); vines.fillRect(vx, 100, 4, 120);
      vines.fillStyle(0x4a8a4a); vines.fillRect(vx+1, 100, 1, 120);
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

// ============================================================
//  LEVEL 2: Temple
// ============================================================
class TempleLevel extends BaseLevel {
  constructor() { super('Temple'); }

  create() {
    super.create();
    this.cameras.main.setBackgroundColor(0x2a2a3a);

    const bg = this.add.graphics().setDepth(0);
    bg.fillStyle(0x3a3a4a); bg.fillRect(0, 0, 320, 240);
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

    this.goal = this.physics.add.staticSprite(160, 20, 'goal');
    this.physics.add.overlap(this.player, this.goal, () => {
      this.statusText.setText('🎉 ВСЁ ПРОЙДЕНО!');
      this.statusText.setStyle({ font: '14px monospace', fill: '#e8c860', fontStyle: 'bold' });
      this.gameWon = true;
      this.physics.pause();
    }, null, this);
  }

  update() {
    if (this.gameWon) return;
    this.setupControls();
    this.checkEdgeTransition(null, 'Jungle');
    this.statusText.setText('');
  }
}

// ============================================================
//  Config
// ============================================================
const config = {
  type: Phaser.AUTO,
  width: GW,
  height: GH,
  parent: 'game-container',
  pixelArt: true,
  input: { activePointers: 3 },
  physics: { default: 'arcade', arcade: { gravity: { y: 480 }, debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [JungleLevel, TempleLevel],
};

new Phaser.Game(config);