const Walk = new Phaser.Scene('walk');

let decorateButton;
let assembleButton;




Walk.preload = function() 
{
    
};




Walk.create = function() 
{


decorateButton = document.createElement('button');
decorateButton.textContent = "Decorate";
decorateButton.classList.add('button');
decorateButton.style.cssText = 'position: absolute; top: 30px; right: 30px; width: 150px; height: 60px;';
decorateButton.addEventListener('click', enterDecorate);
gameDiv.appendChild(decorateButton); 

assembleButton = document.createElement('button');
assembleButton.textContent = "Assemble";
assembleButton.classList.add('button');
assembleButton.style.cssText = 'position: absolute; top: 100px; right: 30px; width: 150px; height: 60px;';
assembleButton.addEventListener('click', enterAssemble);
gameDiv.appendChild(assembleButton); 

if (currentLocation === House)
{
    decorateButton.style.display = 'block';
    assembleButton.style.display = 'block';
}
else
{
    decorateButton.style.display = 'none';
    assembleButton.style.display = 'none';
}

Town.map = this.make.tilemap({ key: Town.mapKey });
Town.map.addTilesetImage('kanagawa64', 'kanagawaTileset');
Town.map.addTilesetImage('trainFloors64', 'trainFloorsTileset');
Town.map.addTilesetImage('trainHouse64', 'trainHouseTileset');
Town.map.addTilesetImage('trainObjects64', 'trainObjectsTileset');

Shop.map = this.make.tilemap({ key: Shop.mapKey });
Shop.map.addTilesetImage('bar64', 'barTileset');
Shop.map.addTilesetImage('school64', 'schoolTileset');

House.map = this.make.tilemap({ key: House.mapKey });
House.map.addTilesetImage('bar64', 'barTileset');
House.map.addTilesetImage('school64', 'schoolTileset');

NeighbourHouse.map = this.make.tilemap({ key: NeighbourHouse.mapKey });
NeighbourHouse.map.addTilesetImage('bar64', 'barTileset');
NeighbourHouse.map.addTilesetImage('school64', 'schoolTileset');

currentLocation.playerMinus3 = currentLocation.map.createStaticLayer('player -3', tilesets, 0, 0);
currentLocation.playerMinus2 = currentLocation.map.createStaticLayer('player -2', tilesets, 0, 0);
currentLocation.playerMinus1 = currentLocation.map.createStaticLayer('player -1', tilesets, 0, 0);
currentLocation.playerPlus1 = currentLocation.map.createStaticLayer('player +1', tilesets, 0, 0);
currentLocation.collision = currentLocation.map.createStaticLayer('collision', tilesets, 0, 0);

currentLocation.playerPlus1.setDepth(2);
currentLocation.collision.setVisible(false);

if (currentLocation === Town)
{
    if (comeFrom === 'startGame')
    {
        startX = 11;
        startY = 22;
        
        this.cameras.main.fadeIn(4000, 255, 255, 255);
    }
    else if (comeFrom === 'house')
    {
        startX = 11;
        startY = 7;
    }
    else if (comeFrom === 'shop')
    {
        startX = 5;
        startY = 13;
    }
    else if (comeFrom === 'neighbourHouse')
    {
        startX = 16;
        startY = 13;
    }
}
else if (currentLocation === House)
{
    startX = 5;
    startY = 7;
}
else if (currentLocation === Shop)
{
    startX = 5;
    startY = 11;
    
}
else if (currentLocation === NeighbourHouse)
{
    startX = 4;
    startY = 8;
}

Player.sprite = this.add.sprite(startX * currentLocation.map.tileWidth, startY * currentLocation.map.tileHeight, 'playerSpritesheet');

if (currentLocation === Town)
{
    Player.sprite.setFrame(0);
}
else
{
    Player.sprite.setFrame(3);
}

Player.sprite.setOrigin(0,0.5);
Player.sprite.setDepth(1);

Player.rightFrameStart = 8;
Player.rightFrameEnd = 11;
Player.leftFrameStart = 12;
Player.leftFrameEnd = 15;
Player.downFrameStart = 4;
Player.downFrameEnd = 7;
Player.upFrameStart = 16;
Player.upFrameEnd = 19;

this.anims.create({
    key: 'walkRight',
    frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: Player.rightFrameStart, end: Player.rightFrameEnd } ),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walkLeft',
    frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: Player.leftFrameStart, end: Player.leftFrameEnd } ),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walkDown',
    frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: Player.downFrameStart, end: Player.downFrameEnd } ),
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: 'walkUp',
    frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: Player.upFrameStart, end: Player.upFrameEnd } ),
    frameRate: 8,
    repeat: -1
});

storedX = Player.sprite.x;
storedY = Player.sprite.y;

this.cameraDolly = new Phaser.Geom.Point(Player.sprite.x, Player.sprite.y);

this.cameras.main.roundPixels = true;

//this.cameras.main.startFollow(Player.sprite, true, 0.2, 0.2);
this.cameras.main.startFollow(this.cameraDolly, true);

marker = this.add.graphics();
marker.lineStyle(3, 0xffffff, 1);
marker.strokeRect(0, 0, currentLocation.map.tileWidth, currentLocation.map.tileHeight);
marker.setDepth(3);

easystar = new EasyStar.js();

let grid = [];

for (let y = 0; y < currentLocation.map.height; y++)
{
    let col = [];
    
    for (let x = 0; x < currentLocation.map.width; x++)
    {
        col.push(getTileID(x, y));
    }
    
    grid.push(col);
}

easystar.setGrid(grid);

//console.log(grid);

easystar.setIterationsPerCalculation(1000);
easystar.setAcceptableTiles([-1]);

this.input.on('pointerup', onClick);

if (currentLocation === House)
{
    for (let i = 0; i < furniture.length; i++)
    {
        if (furniture[i].onDisplay)
        {
            furniture[i].sprite = this.add.sprite(furniture[i].xTile * currentLocation.map.tileWidth, furniture[i].yTile * currentLocation.map.tileHeight, furniture[i].key);
            furniture[i].sprite.setOrigin(0, 0);
            easystar.avoidAdditionalPoint(furniture[i].xTile, furniture[i].yTile);
        }
    }
}
else if (currentLocation === Shop)
{
    Seller.sprite = this.add.sprite(6 * currentLocation.map.tileWidth, 7 * currentLocation.map.tileHeight, 'sellerSprite');
    Seller.sprite.setOrigin(0,0.5);
    easystar.avoidAdditionalPoint(6, 7);
}
else if (currentLocation === NeighbourHouse)
{
    Neighbour.sprite = this.add.sprite(3 * currentLocation.map.tileWidth, 5 * currentLocation.map.tileHeight, 'neighbourSprite');
    Neighbour.sprite.setOrigin(0,0.5);
    easystar.avoidAdditionalPoint(10, 10);
}


};




function enterDecorate()
{
    decorateButton.remove();
    assembleButton.remove();
    
    Walk.scene.start('decorate');
}


function enterAssemble()
{
    decorateButton.remove();
    assembleButton.remove();

    Walk.scene.start('assemble');
}


function checkOverlap(spriteA, spriteB) 
{
    let boundsA = spriteA.getBounds();
    let boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    //return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);
}


function getTileID(x, y)
{
    let tile = currentLocation.map.getTileAt(x, y, true, collision);
    return tile.index;
}


function onClick(pointer)
{
    let x = this.cameras.main.scrollX + pointer.x;
    let y = this.cameras.main.scrollY + pointer.y;
    let toX = Math.floor(x/currentLocation.map.tileWidth);
    let toY = Math.floor(y/currentLocation.map.tileHeight);
    let fromX = Math.floor(Player.sprite.x/currentLocation.map.tileWidth);
    let fromY = Math.floor(Player.sprite.y/currentLocation.map.tileHeight);
    
    //console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');

    easystar.findPath(fromX, fromY, toX, toY, function( path )
    {
        if (path === null) 
        {
            console.warn("Path was not found.");
        } 
        else 
        {
            //console.log(path);
            moveCharacter(path);
        }
    });
    
    easystar.calculate();
}


function moveCharacter(path)
{
    let playerTweens = [];
    for(let i = 0; i < path.length-1; i++){
        let ex = path[i+1].x;
        let ey = path[i+1].y;
        playerTweens.push({
            targets: Player.sprite,
            x: {value: ex*currentLocation.map.tileWidth, duration: 200},
            y: {value: ey*currentLocation.map.tileHeight, duration: 200}
        });
    }

    //console.log(playerTweens);

    Walk.tweens.timeline({
        tweens: playerTweens
    });
}


Walk.update = function(time, delta) 
{
    
    
let worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

let pointerTileX = currentLocation.map.worldToTileX(worldPoint.x);
let pointerTileY = currentLocation.map.worldToTileY(worldPoint.y);
marker.x = currentLocation.map.tileToWorldX(pointerTileX);
marker.y = currentLocation.map.tileToWorldY(pointerTileY);
marker.setVisible(!currentLocation.map.hasTileAt(pointerTileX,pointerTileY, collision));

if (Player.sprite.x > storedX)
{
    Player.sprite.anims.play('walkRight', true);
}
else if (Player.sprite.x < storedX)
{
    Player.sprite.anims.play('walkLeft', true);
}
else if (Player.sprite.y > storedY)
{
    Player.sprite.anims.play('walkDown', true);
}
else if (Player.sprite.y < storedY)
{
    Player.sprite.anims.play('walkUp', true);
}
else
{
    Player.sprite.anims.stop();
    
    if (Player.sprite.frame.name >= Player.rightFrameStart && Player.sprite.frame.name <= Player.rightFrameEnd)
    {
        Player.sprite.setFrame(1);
    }
    else if (Player.sprite.frame.name >= Player.leftFrameStart && Player.sprite.frame.name <= Player.leftFrameEnd)
    {
        Player.sprite.setFrame(2);
    }
    else if (Player.sprite.frame.name >= Player.downFrameStart && Player.sprite.frame.name <= Player.downFrameEnd)
    {
        Player.sprite.setFrame(0);
    }
    else if (Player.sprite.frame.name >= Player.upFrameStart && Player.sprite.frame.name <= Player.upFrameEnd)
    {
        Player.sprite.setFrame(3);
    }
}

storedX = Player.sprite.x;
storedY = Player.sprite.y;
    
if (currentLocation === Town) 
{
    if ( (Math.floor(Player.sprite.x/currentLocation.map.tileWidth) === 11 || Math.floor(Player.sprite.x/currentLocation.map.tileWidth) === 12) && Math.floor(Player.sprite.y/currentLocation.map.tileHeight) === 6)
    {
        currentLocation = House;
    
        comeFrom = 'town';
        
        decorateButton.remove();
        assembleButton.remove();
    
        this.scene.restart();
    }
    else if (Math.floor(Player.sprite.x/currentLocation.map.tileWidth) === 5 && Math.floor(Player.sprite.y/currentLocation.map.tileHeight) === 12)
    {
        currentLocation = Shop;
    
        comeFrom = 'town';
    
        decorateButton.remove();
        assembleButton.remove();
    
        this.scene.restart();
    }
    else if (Math.floor(Player.sprite.x/currentLocation.map.tileWidth) === 16 && Math.floor(Player.sprite.y/currentLocation.map.tileHeight) === 12)
    {
        currentLocation = NeighbourHouse;
    
        comeFrom = 'town';
        
        decorateButton.remove();
        assembleButton.remove();
    
        this.scene.restart();
    }
} 
else if (currentLocation === House && Math.floor(Player.sprite.x/currentLocation.map.tileWidth) === 5 && Math.floor(Player.sprite.y/currentLocation.map.tileHeight) === 8)
{
    currentLocation = Town;
    
    comeFrom = 'house';
    
    decorateButton.remove();
    assembleButton.remove();
    
    this.scene.restart();
}
else if (currentLocation === Shop && Math.floor(Player.sprite.x/currentLocation.map.tileWidth) === 5 && Math.floor(Player.sprite.y/currentLocation.map.tileHeight) === 12)
{
    currentLocation = Town;
    
    comeFrom = 'shop';
    
    decorateButton.remove();
    assembleButton.remove();
    
    this.scene.restart();
}
else if (currentLocation === NeighbourHouse && Math.floor(Player.sprite.x/currentLocation.map.tileWidth) === 4 && Math.floor(Player.sprite.y/currentLocation.map.tileHeight) === 9)
{
    currentLocation = Town;
    
    comeFrom = 'neighbourHouse';
    
    decorateButton.remove();
    assembleButton.remove();
    
    this.scene.restart();
}

if (currentLocation === Shop && Seller.sprite != undefined)
{
    if (checkOverlap(Player.sprite, Seller.sprite))
    {
        decorateButton.remove();
        assembleButton.remove();

        this.scene.start('purchase');
    }
}
else if (currentLocation === NeighbourHouse && Neighbour.sprite != undefined)
{
    if (checkOverlap(Player.sprite, Neighbour.sprite))
    {
        decorateButton.remove();
        assembleButton.remove();
        
        this.scene.start('earn');
    }
}

this.cameraDolly.x = Math.floor(Player.sprite.x);
this.cameraDolly.y = Math.floor(Player.sprite.y);
    
};