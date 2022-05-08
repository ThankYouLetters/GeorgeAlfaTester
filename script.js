consoleText(['Hello George.', 'Thank You', 'for alfa testing', 'my Website,', 'that means a lot', 'to Me.', 'And yo!', 'thanks for', "making Mr. C's", 'class more fun!'], 'text',['rgb(52,0,164)','darkblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

window.addEventListener("load",function(){
  //var canvas_wrapper = document.getElementsByClassName("canvas-wrapper");
  var canvas = document.getElementById("random-moving");
  var ctx = canvas.getContext("2d");
  var win_width = window.innerWidth;
  var win_height = window.innerHeight;
  var count = 150;
  var particles = [];
  var createdObj = 0;
  var max_speed = 15.0;
  var min_speed = 0.1;
  var colors = ['rgb(52,0,164)', 'darkblue', 'rgb(52,0,164)', 'darkblue', 'darkblue'];
  canvas.setAttribute("width", win_width);
  canvas.setAttribute("height",win_height);

  function Particle() {
    this.color = colors[Math.floor(Math.random()*5)];
    this.radius = 3;
    this.min_location = max_speed + 1;
    this.x = Math.random() * (win_width - (2 * this.min_location)) + this.min_location;
    this.y = Math.random() * (win_height - (2 * this.min_location)) + this.min_location;
    this.speedx = Math.random() * max_speed + min_speed;
    this.speedy = Math.random() * max_speed + min_speed;
  }
  Particle.prototype.direction = function(){
    switch (Math.floor(Math.random() * 4 + 1)) {
      case 1:
        this.speedx *= 1;
        this.speedy *= 1;
        break;
      case 2:
        this.speedx *= -1;
        this.speedy *= 1;
        break;
      case 3:
        this.speedx *= 1;
        this.speedy *= -1;
        break;
      case 4:
        this.speedx *= -1;
        this.speedy *= -1;
        break;
    }
  }
  Particle.prototype.move = function() {
    if (this.x <= this.radius || this.x >= win_width - this.radius) {
      this.speedx *= -1;
    }
    if (this.y <= this.radius || this.y >= win_height - this.radius) {
      this.speedy *= -1;
    }
    this.x += this.speedx;
    this.y += this.speedy;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fill();
  };
  for (var i = 0; i < count; i++) {
    particles[i] = new Particle();
    particles[i].direction();
  }
  function animate(){/*
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, win_width, win_height);*/
  ctx.clearRect(0, 0, win_width, win_height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
  }
  requestAnimationFrame(animate);
  }
  animate();
});