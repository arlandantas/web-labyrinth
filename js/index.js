import MapScene from "./map.js";
import Phaser from "phaser";
// https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6

var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 },
      // gravity: { y: 300, x: 0 },
      debug: false
    }
  },
  scene: MapScene
};

var game = new Phaser.Game(config);


/* Get MotionAPI */
let bt_motion = document.getElementById("bt_motion")
bt_motion.onclick = () => {
  update_control(!motion_control)
}

window.motion_control = false
let update_control = (motion) => {
  window.motion_control = motion
  bt_motion.innerText = "Usando "+(window.motion_control ? "Motion" : "Setas")
}

window.gyro_sensor = { x: null, y: null, z: null };
if (window.DeviceMotionEvent==undefined) {
  update_control(false)
} else {
  window.addEventListener("devicemotion", function(event) {
    if (window.motion_control) {
      var x = event.accelerationIncludingGravity.x
      var y = event.accelerationIncludingGravity.y
      var z = event.accelerationIncludingGravity.z
      window.gyro_sensor = { x, y, z }
    }
  })
}