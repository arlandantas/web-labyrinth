import Phaser from "phaser";
import Player from "./player.js";

export default class PlatformerScene extends Phaser.Scene {
  preload () {
    this.load.image("player", "../assets/square.png");
  
    this.load.image("tiles", "../assets/spr_all5_4A2.png");
    this.load.tilemapTiledJSON("map", "../assets/mapa1.json");

    this.load.spritesheet(
      "spritesheet",
      "../assets/spr_all5_4A2.png",
      {
        frameWidth: 20,
        frameHeight: 20,
        margin: 1,
        spacing: 1
      }
    );

    this.score = 0
  }
  
  create () {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("spr_all5_4A2", "tiles");
  
    map.createStaticLayer("Chao", tileset, 0, 0).setScale(1.5);
    const worldLayer = map.createStaticLayer("Paredes", tileset, 0, 0).setScale(1.5);
    worldLayer.setCollisionByProperty({ colide: true });

    let pos_moedas = map.filterObjects(
      "Objetos",
      obj => obj.type === "moeda"
    )
    this.anims.create({
      key: "moeda-girando",
      frames: this.anims.generateFrameNumbers("spritesheet", { start: 0, end: 7 }),
      frameRate: 6,
      repeat: -1
    })
    this.moedas = this.physics.add.group();
    // this.moedas = this.physics.add.staticGroup();
    for (let p of pos_moedas) {
      let moeda = this.physics.add
        .sprite((p.x + 10) * 1.5, (p.y - 10) * 1.5, 'spritesheet')
        .setScale(1.5)
      moeda.anims.play("moeda-girando", true)
      this.moedas.add(moeda)
    }

    const spawnPoint = map.findObject("Lugares", obj => obj.name === "Inicio Jogador");
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    
    this.physics.add.collider(this.player.sprite, worldLayer);
    this.physics.add.collider(this.player.sprite, this.moedas, this.coletarMoeda, null, this);
  
    // this.gravityText = this.add.text(10, 10, '');
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  }

  coletarMoeda (player, moeda) {
    moeda.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
  
  update (time, delta) {
    this.player.update();

    // this.gravityText.text = `X: ${this.player.velocity.x} Y: ${this.player.velocity.y}`
  }
}