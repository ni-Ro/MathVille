const Decorate = new Phaser.Scene('decorate');

let exitDecorateButton;



Decorate.preload = function()
{
    
};




Decorate.create = function()
{
    
    
exitDecorateButton = document.createElement('button');
exitDecorateButton.textContent = "Exit";
exitDecorateButton.classList.add('button');
exitDecorateButton.style.cssText = 'position: absolute; top: 30px; left: 30px; width: 150px; height: 60px;';
exitDecorateButton.addEventListener('click', exitDecorate);
gameDiv.appendChild(exitDecorateButton); 

House.map = this.make.tilemap({ key: House.mapKey });
House.map.addTilesetImage('bar64', 'barTileset');
House.map.addTilesetImage('school64', 'schoolTileset');

House.playerMinus3 = House.map.createStaticLayer('player -3', tilesets, 0, 0);
House.playerMinus2 = House.map.createStaticLayer('player -2', tilesets, 0, 0);
House.playerMinus1 = House.map.createStaticLayer('player -1', tilesets, 0, 0);
House.playerPlus1 = House.map.createStaticLayer('player +1', tilesets, 0, 0);

House.playerPlus1.setDepth(2);

this.cameras.main.setZoom(0.82);
this.cameras.main.roundPixels = true;
this.cameras.main.setScroll(102, -20);

let storageCounter = 0;

let storageX = 700;
let storageY = -60;

let yGapDecorate = 68;

for (let i = 0; i < furniture.length; i++)
{
    if (furniture[i].assembled)
    {
        if (storageCounter === 10)
        {
            storageX = 800;
            storageY = -60 - (storageCounter * yGapDecorate);
        }
        else if (storageCounter === 20)
        {
            storageX = 900;
            storageY = -60 - (storageCounter * yGapDecorate);
        }
        
        furniture[i].storageSprite = this.add.sprite(storageX, storageY + storageCounter * yGapDecorate, furniture[i].key);
        furniture[i].storageSprite.setOrigin(0, 0);
        furniture[i].storageSprite.alpha = 0.5;
        
        if (furniture[i].onDisplay)
        {
            furniture[i].sprite = this.add.sprite(furniture[i].xTile * House.map.tileWidth, furniture[i].yTile * House.map.tileHeight, furniture[i].key).setInteractive();
        }
        else
        {
            furniture[i].sprite = this.add.sprite(furniture[i].storageSprite.x, furniture[i].storageSprite.y, furniture[i].key).setInteractive();
        }
        
        furniture[i].sprite.setOrigin(0, 0);
        this.input.setDraggable(furniture[i].sprite);
        
        storageCounter++;
    }
}

this.input.on('drag', function (pointer, gameObject, dragX, dragY) 
{
    gameObject.x = Phaser.Math.Snap.To(dragX, House.map.tileWidth);
    gameObject.y = Phaser.Math.Snap.To(dragY, House.map.tileHeight);
});

this.input.on('dragend', function (pointer, gameObject) 
{
    for (let i = 0; i < furniture.length; i++)
    {   
        if (gameObject.texture.key === furniture[i].key)
        {
            if (gameObject.x/House.map.tileWidth <= 0 || gameObject.x/House.map.tileWidth >= 10 || gameObject.y/House.map.tileHeight <= 1 || gameObject.y/House.map.tileHeight >= 7)
            {
                furniture[i].onDisplay = false;
                furniture[i].sprite.x = furniture[i].storageSprite.x;
                furniture[i].sprite.y = furniture[i].storageSprite.y;
            }
            else
            {
                furniture[i].onDisplay = true;
                furniture[i].xTile = gameObject.x/House.map.tileWidth;
                furniture[i].yTile = gameObject.y/House.map.tileHeight;
                break;
            }
        }
    }
});


};




function exitDecorate()
{
    exitDecorateButton.remove();
    
    Decorate.scene.start('walk');
}



Decorate.update = function(time, delta)
{
    
};