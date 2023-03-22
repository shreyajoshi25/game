let colors=['yellow', 'red', 'blue', 'black', 'green']; 
let windowWidth=window.innerWidth;
let windowHeight=window.innerHeight;
let body=document.body;
let scores=document.querySelectorAll('.score');
let num=0;
let total=100;
let currentTrash=0;
let gameOver= false;
let totalShadow=document.querySelector('.total-shadow');
let startBtn=document.querySelector('.start-game-button');

function createTrash(){
	let div=document.createElement('div');
	let rand=Math.floor(Math.random()*colors.length);
	div.className='trash '+colors[rand]+'-trash';

	rand=Math.floor(Math.random()*(windowWidth-100));
	div.style.left=rand + 'px';
	div.dataset.number=currentTrash;
	currentTrash++;

	body.appendChild(div);
	animateTrash(div);
}

function animateTrash(elem){
	let pos=0;
	let random=Math.floor(Math.random()*6-3);
	let interval=setInterval(frame, Math.floor(12- num/10)+random);
	function frame(){
		if (pos>=(windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]')!=null)){
			clearInterval(interval);
			gameOver = true;
		}
		else{
			pos++;
			elem.style.top =  windowHeight - pos + 'px'; 
		}
	}
}

function deleteTrash(elem){
	elem.remove();
	num++;
	updateScore();
	playBallSound();
}

function playBallSound(){
	let audio=document.createElement('audio');
	audio.src='sounds/pop.mp3';
	audio.play();
}

function updateScore(){
	for(let i=0; i<scores.length; i++){
		scores[i].textContent=num;
	}
}

function startGame(){
	restartGame();
	let timeout=0;

	let loop= setInterval(function(){
		timeout=Math.floor(Math.random()*600-100)
		if(gameOver!=true && num!==total){
			createTrash();
		}
		else if(num!==total){
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display='block';
		}
		else{
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display='block';
		}
	}, 800 + timeout);
}

function restartGame(){
	let forRemoving = document.querySelectorAll('.trash');
	for(let i = 0; i< forRemoving.length; i++){
		forRemoving[i].remove();
	}
	gameOver=false;
	num=0;
	updateScore();
}
document.addEventListener('click', function(event){
	if(event.target.classList.contains('trash')){
		deleteTrash(event.target);
	}
})

document.querySelector('.restart').addEventListener('click', function(){
	totalShadow.style.display='none';
	totalShadow.querySelector('.win').style.display='none';
	totalShadow.querySelector('.lose').style.display='none';
	startGame();
})

document.querySelector('.cancel').addEventListener('click', function(){
	totalShadow.style.display='none';
})


startBtn.addEventListener('click', function(){
	startGame();
	document.querySelector('.bg-music').play;
	document.querySelector('.start-game-window').style.display='none';
})