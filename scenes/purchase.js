const Purchase = new Phaser.Scene('purchase');

let exitPurchaseButton;
let purchaseDiv;
let purchasePara;
let purchaseButton;
let yesButton;
let noButton;

let numberPerfected = 0;
let levelTwoUnlocked;

let levelOneText;
let levelTwoText;




Purchase.preload = function()
{
    
};




Purchase.create = function()
{
    
    
exitPurchaseButton = document.createElement('button');
exitPurchaseButton.textContent = "Exit";
exitPurchaseButton.classList.add('button');
exitPurchaseButton.style.cssText = 'position: absolute; top: 30px; left: 30px; width: 150px; height: 60px;';
exitPurchaseButton.addEventListener('click', exitPurchase);
gameDiv.appendChild(exitPurchaseButton); 

purchaseDiv = document.createElement('div');
purchaseDiv.classList.add('message');
purchaseDiv.style.cssText = 'position: absolute; bottom: 80px; left: 100px; width: 600px; height: 120px;';
gameDiv.appendChild(purchaseDiv);

purchasePara = document.createElement('p');
purchasePara.classList.add("para", "centered");
purchasePara.style.cssText = "width: 280px;";
purchasePara.textContent = "Hi again! Would you like to buy a furniture pack?";
purchaseDiv.appendChild(purchasePara);

Player.bustImage = document.createElement('img');
Player.bustImage.src = 'assets/images/busts/playerBust.png';
Player.bustImage.style.cssText = 'position: absolute; left: 0px; bottom: 0px; width: 250px;';
gameDiv.appendChild(Player.bustImage);

Seller.bustImage = document.createElement('img');
Seller.bustImage.src = 'assets/images/busts/sellerBust.png';
Seller.bustImage.style.cssText = 'position: absolute; right: 0px; bottom: 0px; width: 250px;';
gameDiv.appendChild(Seller.bustImage);

purchaseButton = document.createElement('button');
purchaseButton.textContent = "Shop";
purchaseButton.classList.add('button');
purchaseButton.style.cssText = 'position: absolute; bottom: 10px; left: 325px; width: 150px; height: 60px;';
purchaseButton.addEventListener('click', createPurchaseList);
gameDiv.appendChild(purchaseButton); 

yesButton = document.createElement('button');
yesButton.textContent = "Yes";
yesButton.classList.add('button');
yesButton.style.cssText = 'position: absolute; bottom: 10px; left: 245px; width: 150px; height: 60px; display: none;';
yesButton.addEventListener('click', yesPurchase);
gameDiv.appendChild(yesButton);

noButton = document.createElement('button');
noButton.textContent = "No";
noButton.classList.add('button');
noButton.style.cssText = 'position: absolute; bottom: 10px; right: 245px; width: 150px; height: 60px; display: none;';
noButton.addEventListener('click', noPurchase);
gameDiv.appendChild(noButton);

moneyText = this.add.text(575, 10, "Money: $" + Player.money, { fontFamily: 'Overpass', fontSize: 30, color: '#ffffff' } );

for (let i = 0; i < furniture.length; i++)
{
    if (furniture[i].perfected)
    {
        numberPerfected++;
    }
}

if (numberPerfected > 5)
{
    levelTwoUnlocked = true;
}
else
{
    levelTwoUnlocked = false;
}


};




function exitPurchase()
{
    exitPurchaseButton.remove();
    purchaseDiv.remove();
    Player.bustImage.remove();
    Seller.bustImage.remove();
    purchaseButton.remove();
    yesButton.remove();
    noButton.remove();
    
    Purchase.scene.start('walk'); 
}


function createPurchaseList()
{
    purchaseDiv.style.display = 'none';
    Player.bustImage.style.display = 'none';
    Seller.bustImage.style.display = 'none';
    purchaseButton.style.display = 'none';
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
 
    levelOneText = Purchase.add.text(50, 115, "Level 1 Packs", { fontFamily: 'Overpass', fontSize: 20, color: '#ffffff' } );

    levelTwoText = Purchase.add.text(50, 345, "", { fontFamily: 'Overpass', fontSize: 20, color: '#ffffff' } );
    
    if (levelTwoUnlocked)
    {
        levelTwoText.text = "Level 2 Packs"
    }
    else
    {
        levelTwoText.text = "Level 2 Packs (unlock by assembling 6 packs from Level 1 perfectly!)";
    }
    
    let levelOneCounter = 0;
    let levelTwoCounter = 0;
    
    let level1StartingX = 50;
    let level2StartingX = 50;
    
    let level1Y = 150;
    let level2Y = 400;
    
    let xGapPurchase = 120;
    
    for (let i = 0; i < furniture.length; i++)
    {
        if (!furniture[i].purchased)
        {
            if (furniture[i].level === 1)
            {
                if (levelOneCounter === 6)
                {
                    level1StartingX = level1StartingX - (levelOneCounter * xGapPurchase);
                    level1Y = 225;
                }
                
                furniture[i].purchaseSprite = Purchase.add.sprite(level1StartingX + levelOneCounter * xGapPurchase, level1Y, furniture[i].key);
                
                furniture[i].costText = Purchase.add.text(level1StartingX - 25 + levelOneCounter * xGapPurchase, level1Y + 15, "$" + furniture[i].cost, { fontFamily: 'Overpass', fontSize: 20, color: '#ffffff' } );
                
                levelOneCounter++;
            }
            else if (furniture[i].level === 2)
            {
                if (levelTwoCounter === 6)
                {
                    level2StartingX = level2StartingX - (levelTwoCounter * xGapPurchase);
                    level2Y = 475;
                }
                
                furniture[i].purchaseSprite = Purchase.add.sprite(level2StartingX + levelTwoCounter * xGapPurchase, level2Y, furniture[i].key);
                
                furniture[i].costText = Purchase.add.text(level2StartingX - 25 + levelTwoCounter * xGapPurchase, level2Y + 15, "$" + furniture[i].cost, { fontFamily: 'Overpass', fontSize: 20, color: '#ffffff' } );
                
                levelTwoCounter++;
            }
            
            furniture[i].purchaseSprite.setOrigin(0, 0);
            furniture[i].costText.setOrigin(0, 0);
            
            if (Player.money >= furniture[i].cost && ( (furniture[i].level === 1) || ( furniture[i].level === 2 && levelTwoUnlocked ) ) )
            {
                furniture[i].purchaseSprite.setInteractive();
                
                furniture[i].purchaseSprite.on('pointerup', function() 
                {
                    clickedFurnitureObject = furniture.find(obj => 
                    {
                        return obj.purchaseSprite === this;
                    });
                    
                    //console.log(clickedFurnitureObject);
                    
                    purchasePara.textContent = "Are you sure you want to buy: " + clickedFurnitureObject.name + " for $" + clickedFurnitureObject.cost + "?";
                    purchaseDiv.style.display = 'block';
                    
                    Seller.bustImage.style.display = 'block';
                    
                    yesButton.style.display = 'block';
                    noButton.style.display = 'block';
                });
            }
            else
            {
                furniture[i].purchaseSprite.alpha = 0.5;
            }
        }
    }    
}


function yesPurchase()
{
    Player.money -= clickedFurnitureObject.cost;
    moneyText.text = "Money: $" + Player.money;

    for (let i = 0; i < furniture.length; i++)
    {
        if (!furniture[i].purchased)
        {
            furniture[i].purchaseSprite.destroy();
            furniture[i].costText.destroy();
        }
    }
    
    levelOneText.destroy();
    levelTwoText.destroy();
    
    clickedFurnitureObject.purchased = true;
    
    createPurchaseList();
}


function noPurchase()
{
    purchaseDiv.style.display = 'none';
    Seller.bustImage.style.display = 'none';
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
}




Purchase.update = function(time, delta)
{
    
};