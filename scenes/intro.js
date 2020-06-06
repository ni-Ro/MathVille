const Intro = new Phaser.Scene('intro');

let tutorial;
let tutorialLine;
let tutorialDiv;
let tutorialPara;
let continueButton;



Intro.preload = function() 
{
    
};




Intro.create = function() 
{


Town.map = this.make.tilemap({ key: Town.mapKey });
Town.map.addTilesetImage('kanagawa64', 'kanagawaTileset');
Town.map.addTilesetImage('trainFloors64', 'trainFloorsTileset');
Town.map.addTilesetImage('trainHouse64', 'trainHouseTileset');
Town.map.addTilesetImage('trainObjects64', 'trainObjectsTileset');

Town.playerMinus3 = Town.map.createStaticLayer('player -3', tilesets, 0, 0);
Town.playerMinus2 = Town.map.createStaticLayer('player -2', tilesets, 0, 0);
Town.playerMinus1 = Town.map.createStaticLayer('player -1', tilesets, 0, 0);
Town.playerPlus1 = Town.map.createStaticLayer('player +1', tilesets, 0, 0);

Town.playerPlus1.setDepth(2);

Player.sprite = this.add.sprite(10 * currentLocation.map.tileWidth, 22 * currentLocation.map.tileHeight, 'playerSpritesheet', 1);
Player.sprite.setOrigin(0,0.5);
Player.sprite.setDepth(1);

Seller.sprite = this.add.sprite(11 * currentLocation.map.tileWidth, 22 * currentLocation.map.tileHeight, 'sellerSprite');
Seller.sprite.setOrigin(0,0.5);
Seller.sprite.setDepth(1);

this.cameras.main.centerOn(Player.sprite.x + 64, Player.sprite.y);

tutorial = 
[
    {
        speaker: Seller,
        text: "Welcome to MathVille!"
    },
    {
        speaker: Player,
        text: "Thank you!"
    },
    {
        speaker: Seller,
        text: "I'm Himari, and I own the local shop."
    },
    {
        speaker: Seller,
        text: "If you need any furniture for your new house, please come and see me!"
    },
    {
        speaker: Seller,
        text: "I sell furniture 'packs' that you assemble yourself in your home."
    },
    {
        speaker: Seller,
        text: "As a welcome gift, please take this!"
    },
    {
        speaker: 'none',
        text: "You received: 'Coffee table pack'"
    },
    {
        speaker: Seller,
        text: "Once you've assembled that, you'll be able to use it to decorate your house."
    },
    {
        speaker: Seller,
        text: "And if you ever need money to buy more furniture, try visiting your neighbour."
    },
    {
        speaker: Seller,
        text: "I'm sure they'll have some tasks you can help with."
    },
    {
        speaker: Seller,
        text: "Well, enjoy your new home, and I look forward to seeing you in the shop!"
    }
];

tutorialLine = 0;

tutorialDiv = document.createElement('div');
tutorialDiv.classList.add('message');
tutorialDiv.style.cssText = 'position: absolute; bottom: 80px; left: 100px; width: 600px; height: 120px;';
gameDiv.appendChild(tutorialDiv);

tutorialPara = document.createElement('p');
tutorialPara.classList.add("para", "centered");
tutorialPara.style.cssText = "width: 350px;";
tutorialPara.textContent = tutorial[tutorialLine].text;
tutorialDiv.appendChild(tutorialPara);

Player.bustImage = document.createElement('img');
Player.bustImage.src = 'assets/images/busts/playerBust.png';
Player.bustImage.style.cssText = 'position: absolute; left: 0px; bottom: 0px; width: 250px; display: none;';
gameDiv.appendChild(Player.bustImage);

Seller.bustImage = document.createElement('img');
Seller.bustImage.src = 'assets/images/busts/sellerBust.png';
Seller.bustImage.style.cssText = 'position: absolute; right: 0px; bottom: 0px; width: 250px;';
gameDiv.appendChild(Seller.bustImage);

continueButton = document.createElement('button');
continueButton.textContent = "Continue";
continueButton.classList.add('button');
continueButton.style.cssText = 'position: absolute; bottom: 10px; left: 325px; width: 150px; height: 60px;';
continueButton.addEventListener('click', continueTutorial);
gameDiv.appendChild(continueButton); 


};




function continueTutorial()
{
    tutorialLine++;
    
    if (tutorialLine === tutorial.length)
    {
        tutorialDiv.remove();
        continueButton.remove();
        
        Player.bustImage.remove();
        Seller.bustImage.remove();
        
        Intro.cameras.main.once('camerafadeoutcomplete', function (camera) 
        {
            Intro.scene.start('walk');
        }, this);
        
        Intro.cameras.main.fadeOut(4000, 255, 255, 255);
    }
    else
    {
        tutorialPara.textContent = tutorial[tutorialLine].text;
        
        if (tutorial[tutorialLine].speaker === Player)
        {
            Player.bustImage.style.display = 'block';
            Seller.bustImage.style.display = 'none';
        }
        else if (tutorial[tutorialLine].speaker === Seller)
        {
            Player.bustImage.style.display = 'none';
            Seller.bustImage.style.display = 'block';
        }
        else
        {
            Player.bustImage.style.display = 'none';
            Seller.bustImage.style.display = 'none';
        }
    }
}




Intro.update = function(time, delta) 
{



    
    
};