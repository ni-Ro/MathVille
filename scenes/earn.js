const Earn = new Phaser.Scene('earn');

let exitEarnButton;
let earnDiv;
let earnPara;
let startEarnButton;
let tryAgainEarnButton;

let score = 0;
let timer;
let moneyEarned;

let highScoreText;
let timerText;
let answerText;
let scoreText;
let calculationText;

let numbersActive = false;



Earn.preload = function()
{
    
};




Earn.create = function()
{
    

exitEarnButton = document.createElement('button');
exitEarnButton.textContent = "Exit";
exitEarnButton.classList.add('button');
exitEarnButton.style.cssText = 'position: absolute; top: 30px; left: 30px; width: 150px; height: 60px;';
exitEarnButton.addEventListener('click', exitEarn);
gameDiv.appendChild(exitEarnButton); 

earnDiv = document.createElement('div');
earnDiv.classList.add('message');
earnDiv.style.cssText = 'position: absolute; bottom: 80px; left: 100px; width: 600px; height: 120px;';
gameDiv.appendChild(earnDiv);

earnPara = document.createElement('p');
earnPara.classList.add("para", "centered");
earnPara.style.cssText = "width: 280px;";
earnPara.textContent = "Hi! Can you quickly help me with some calculations please?";
earnDiv.appendChild(earnPara);

Player.bustImage = document.createElement('img');
Player.bustImage.src = 'assets/images/busts/playerBust.png';
Player.bustImage.style.cssText = 'position: absolute; left: 0px; bottom: 0px; width: 250px;';
gameDiv.appendChild(Player.bustImage);

Neighbour.bustImage = document.createElement('img');
Neighbour.bustImage.src = 'assets/images/busts/neighbourBust.png';
Neighbour.bustImage.style.cssText = 'position: absolute; right: 0px; bottom: 0px; width: 250px;';
gameDiv.appendChild(Neighbour.bustImage);

startEarnButton = document.createElement('button');
startEarnButton.textContent = "Start";
startEarnButton.classList.add('button');
startEarnButton.style.cssText = 'position: absolute; bottom: 10px; left: 325px; width: 150px; height: 60px;';
startEarnButton.addEventListener('click', setUpGame);
gameDiv.appendChild(startEarnButton); 

tryAgainEarnButton = document.createElement('button');
tryAgainEarnButton.textContent = "Try again";
tryAgainEarnButton.classList.add('button');
tryAgainEarnButton.style.cssText = 'position: absolute; bottom: 10px; left: 325px; width: 150px; height: 60px; display: none;';
tryAgainEarnButton.addEventListener('click', startGame);
gameDiv.appendChild(tryAgainEarnButton);  

moneyText = this.add.text(575, 10, "Money: $" + Player.money, { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff' } );

highScoreText = this.add.text(575, 50, "High Score: " + Player.highScore, { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff' } );


};




function exitEarn()
{
    exitEarnButton.remove();
    earnDiv.remove();
    Player.bustImage.remove();
    Neighbour.bustImage.remove();
    
    if (startEarnButton != undefined)
    {
        startEarnButton.remove();
    }
    
    if (tryAgainEarnButton != undefined)
    {
        tryAgainEarnButton.remove();
    }
    
    Earn.scene.start('walk'); 
}


function setUpGame()
{
    startEarnButton.remove();

    earnDiv.style.display = 'none';
    Player.bustImage.style.display = 'none';
    Neighbour.bustImage.style.display = 'none';
    
    scoreText = Earn.add.text(650, 500, "Score: " + score, { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff' } );
    
    timerText = Earn.add.text(650, 550, "", { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff' } );

    calculationText = Earn.add.text(365, 150, "", { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff' } );
    
    answerText = Earn.add.text(370, 225, "", { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff' } );
    
    for (let i = 0; i < 10; i++)
    {
        let numberButton = Earn.add.text(150 + i * 50, 300, " " + i + " ", { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff', backgroundColor: '#EFBFBF' } );
        numberButton.setInteractive();
        numberButton.on('pointerup', function()
        {
            if (numbersActive === true && answerText.text.length < 3)
            {
                answerText.text += this.text.replace(/\s+/g, '');
            }
        });
    }
    
    let deleteButton = Earn.add.text(275, 400, " Delete ", { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff', backgroundColor: '#EFBFBF' } );
    deleteButton.setInteractive();
    deleteButton.on('pointerup', function()
    {
       answerText.text = answerText.text.substring(0, answerText.text.length - 1);
    });
    
    submitButton = Earn.add.text(425, 400, " Check ", { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff', backgroundColor: '#EFBFBF' } );
    submitButton.setInteractive();
    submitButton.on('pointerup', function()
    {
        if (parseInt(answerText.text) === randomNum1 * randomNum2)
        {
            score++;
            
            startQuestion();
        }
        else
        {
            score--;
            
            submitButton.text = " Try again! ";
        }
        
        scoreText.text = "Score: " + score;
        
    });
    
    startGame();
}


function startGame()
{
    numbersActive = true;
    
    earnDiv.style.display = 'none';
    Player.bustImage.style.display = 'none';
    Neighbour.bustImage.style.display = 'none';
    tryAgainEarnButton.style.display = 'none';

    submitButton.setInteractive();

    score = 0;
    scoreText.text = "Score: " + score;
    
    moneyText.text = "Money: " + Player.money;
    
    timer = Earn.time.delayedCall(20000, onTimeUp, [], this);
    
    startQuestion();
}


function startQuestion()
{
    answerText.text = "";

    randomNum1 = Math.floor(Math.random() * 10) + 1;
    randomNum2 = Math.floor(Math.random() * 10) + 1;   
    calculationText.text = randomNum1 + " X " + randomNum2;
    
    submitButton.text = " Check ";
}


function onTimeUp()
{
    numbersActive = false;
    submitButton.disableInteractive();
    
    if (score > Player.highScore)
    {
        Player.highScore = score;
        highScoreText.text = "High Score: " + Player.highScore;
    }
    
    if (score < 1)
    {
        moneyEarned = 0;
        earnPara.textContent = "On second thoughts, I'll do it myself. Thanks anyway!";
    }
    else if (score < 5)
    {
        moneyEarned = 2;
        earnPara.textContent = "Thanks! Here's $" + moneyEarned + " for helping!";
    }
    else
    {
        moneyEarned = 4;
        earnPara.textContent = "Thanks so much! Here's $" + moneyEarned + " for helping!";
    }
    
    Player.money += moneyEarned;
    
    answerText.text = "";
    calculationText.text = "";
    
    earnDiv.style.display = 'block';
    Player.bustImage.style.display = 'block';
    Neighbour.bustImage.style.display = 'block';
    tryAgainEarnButton.style.display = 'block';
    

}




Earn.update = function(time, delta)
{

    
    if (timerText != undefined)
    {
        timerText.setText("Time: " + (20 - timer.getProgress() * 20).toFixed(1));
    }


};