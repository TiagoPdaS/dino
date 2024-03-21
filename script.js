document.addEventListener('DOMContentLoaded', () => {
	const dino = document.querySelector('.dino')
	const grid = document.querySelector('.grid')
	const body = document.querySelector('body')
	const alert = document.getElementById('alert')
  
	let jumping = false
	let gravity = 0.9
	let gameover = false
	let dinopy = 0
	let obstaclesJumped = 0 // Variável para contar quantos obstáculos o dinossauro pulou
  
	// Data Entry
	document.addEventListener('keyup', jumpcontrol)
  
	// Mobile jump
	body.addEventListener('touchstart', jumpcontrol)
  
	// Jump control
	function jumpcontrol(e) {
	  if (e.keyCode === 32 || e.type === 'touchstart') {
		if (!jumping) {
		  jumping = true
		  jump()
		}
	  }
	}
  
	function jump() {
	  let count = 0
	  let timerId = setInterval(function () {
		// Falling
		if (count === 15) {
		  clearInterval(timerId)
		  let downTimerId = setInterval(function () {
			if (count === 0) {
			  clearInterval(downTimerId)
			  jumping = false
			}
			dinopy -= 5
			count--
			dinopy = dinopy * gravity
			dino.style.bottom = dinopy + 'px'
		  }, 20)
		}
		// Jump Climb
		dinopy += 30
		count++
		dinopy = dinopy * gravity
		dino.style.bottom = dinopy + 'px'
	  }, 20)
	}
  
	function creatingObstacle() {
	  let randomTime = Math.random() * 4000
	  let obstaclepx = 1000
	  const obstacle = document.createElement('div')
  
	  // Creating obstacle
	  if (!gameover) obstacle.classList.add('obstacle')
	  grid.appendChild(obstacle)
	  obstacle.style.left = obstaclepx + 'px'
  
	  // Game Logic + Obstacle Movement
	  let timerId = setInterval(function () {
		// Collision with the player
		if (obstaclepx > 0 && obstaclepx < 60 && dinopy < 60) {
		  clearInterval(timerId)
		  alert.innerHTML = 'Game Over!'
		  gameover = true
		  // Removing obstacle
		  body.removeChild(body.firstChild)
		  while (grid.firstChild) {
			grid.removeChild(grid.lastChild)
		  }
		}
		// Movement of obstacles to the left
		obstaclepx -= 10
		obstacle.style.left = obstaclepx + 'px'
	  }, 30)
  
	  // Incrementar a contagem de obstáculos pulados quando o obstáculo passar
	  if (!gameover) {
		obstaclesJumped++
		setTimeout(creatingObstacle, randomTime)
	  }
	}
  
	creatingObstacle()
  
	// Função para exibir o número de obstáculos pulados
	function displayObstaclesJumped() {
	  console.log('Obstacles jumped:', obstaclesJumped)
	}
  
	// Chamar a função de exibição quando necessário
	// Por exemplo, após um certo intervalo de tempo ou quando o jogo acabar
  })
  