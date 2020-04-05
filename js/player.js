import Phaser from "phaser";

export default class Player {
  
  constructor(scene, x, y) {
    this.velocity = { y: 0, x: 0 }
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: "player-parado",
      frames: anims.generateFrameNumbers("spritesheet", { start: 89, end: 90 }),
      frameRate: 3,
      repeat: -1
    })
    anims.create({
      key: "player-direita",
      frames: anims.generateFrameNumbers("spritesheet", { start: 72, end: 75 }),
      frameRate: 3,
      repeat: -1
    })
    anims.create({
      key: "player-esquerda",
      frames: anims.generateFrameNumbers("spritesheet", { start: 55, end: 58 }),
      frameRate: 3,
      repeat: -1
    })
    anims.create({
      key: "player-baixo",
      frames: anims.generateFrameNumbers("spritesheet", { start: 89, end: 92 }),
      frameRate: 3,
      repeat: -1
    })
    anims.create({
      key: "player-cima",
      frames: anims.generateFrameNumbers("spritesheet", { start: 106, end: 109 }),
      frameRate: 3,
      repeat: -1
    })

    this.sprite = scene.physics.add
      .sprite(x * 1.5, y * 1.5, 'spritesheet')
      // .setScale(.5)
    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);

    const { LEFT, RIGHT, UP, DOWN, W, A, D, S } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D
    });
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;

    if (window.motion_control) {
      this.velocity.x = window.gyro_sensor.x * -50
      this.velocity.y = window.gyro_sensor.y * 50
      this.sprite.body.setGravityX(this.velocity.x)
      this.sprite.body.setGravityY(this.velocity.y)
    } else {
      if (this.keys.left.isDown || this.keys.a.isDown) {
        this.velocity.x = -100
      } else if (this.keys.right.isDown || this.keys.a.isDown) {
        this.velocity.x = 100
      } else {
        this.velocity.x = 0
      }
      if (this.keys.up.isDown || this.keys.w.isDown) {
        this.velocity.y = -100
      } else if (this.keys.down.isDown || this.keys.s.isDown) {
        this.velocity.y = 100
      } else {
        this.velocity.y = 0
      }
      this.sprite.body.setGravityX(0)
      this.sprite.body.setGravityY(0)
      this.sprite.body.setVelocityX(this.velocity.x)
      this.sprite.body.setVelocityY(this.velocity.y)

      if (this.velocity.x == 0 && this.velocity.y == 0) {
        this.sprite.anims.play("player-parado", true);
      } else if (Math.abs(this.velocity.x) > Math.abs(this.velocity.y)) {
        if (this.velocity.x > 0) sprite.anims.play("player-direita", true);
        else sprite.anims.play("player-esquerda", true);
      } else {
        if (this.velocity.y > 0) sprite.anims.play("player-baixo", true);
        else sprite.anims.play("player-cima", true);
      }
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
