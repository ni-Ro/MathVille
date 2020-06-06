const Load = new Phaser.Scene('load');




Load.preload = function()
{

this.load.image('barTileset', 'assets/tilesets/bar64.png');
this.load.image('kanagawaTileset', 'assets/tilesets/kanagawa64.png');
this.load.image('schoolTileset', 'assets/tilesets/school64.png');
this.load.image('trainFloorsTileset', 'assets/tilesets/trainFloors64.png');
this.load.image('trainHouseTileset', 'assets/tilesets/trainHouse64.png');
this.load.image('trainObjectsTileset', 'assets/tilesets/trainObjects64.png');

this.load.tilemapTiledJSON(Town.mapKey, 'assets/tilemaps/town.json');
this.load.tilemapTiledJSON(Shop.mapKey, 'assets/tilemaps/shop.json');
this.load.tilemapTiledJSON(House.mapKey, 'assets/tilemaps/house.json');
this.load.tilemapTiledJSON(NeighbourHouse.mapKey, 'assets/tilemaps/neighbourHouse.json');

this.load.spritesheet('playerSpritesheet', 'assets/spritesheets/playerSpritesheet.png', 
{
    frameWidth: 64, 
    frameHeight: 72 
});

this.load.image('sellerSprite', 'assets/spritesheets/sellerSprite.png');
this.load.image('neighbourSprite', 'assets/spritesheets/neighbourSprite.png');

for (let i = 0; i < furniture.length; i++)
{
    this.load.image(furniture[i].key, 'assets/images/furniture/' + furniture[i].png);
}

this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');


};




Load.create = function()
{


WebFont.load(
    {
        google: 
        {
            families: [ 'Overpass' ]
        },
    });
    
this.scene.start('intro');
    
    
};




Load.update = function(time, delta)
{
    
};