// ============================================================
//  BASE LEVEL — common logic for all levels
// ============================================================
import { registerTextures } from '../textures.js';

export class BaseLevel extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {
    this.coinCount = data.coinCount || 0;
    this.fromLevel = data.from || null;
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
    // right edge -> next level
    if (p.x > 320) {
      this.scene.start(nextScene, { coinCount: this.coinCount, from: this.scene.key });
    }
    // left edge -> previous level
    if (p.x < -12) {
      if (prevScene) {
        this.scene.start(prevScene, { coinCount: this.coinCount, from: this.scene.key });
      }
    }
  }
}