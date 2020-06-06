const Assemble = new Phaser.Scene('assemble');

let exitAssembleButton;
let confirmationDiv;
let confirmationPara;
let confirmationButton;

let newText;
let rebuildText;

let unit;
let randomNum3;
let randomNum4;

let assembleDiv;
let titlePara;
let qualityBarDiv;
let qualityProgressDiv;
let quality;
let questionPara;
let answerInput;
let steps;
let step;
let hintDiv;




Assemble.preload = function()
{
    
};




Assemble.create = function()
{
    

exitAssembleButton = document.createElement('button');
exitAssembleButton.textContent = "Exit";
exitAssembleButton.classList.add('button');
exitAssembleButton.style.cssText = 'position: absolute; top: 30px; left: 30px; width: 150px; height: 60px;';
exitAssembleButton.addEventListener('click', exitAssemble);
gameDiv.appendChild(exitAssembleButton); 

createAssembleList();


};




function exitAssemble()
{
    exitAssembleButton.remove();
    
    if (assembleDiv != undefined)
    {
        assembleDiv.remove();
    }
    
    Assemble.scene.start('walk'); 
}


function createAssembleList()
{
    newText = Assemble.add.text(50, 100, "New", { fontFamily: 'Overpass', fontSize: 20, color: '#ffffff' } );
    rebuildText = Assemble.add.text(50, 345, "Rebuild", { fontFamily: 'Overpass', fontSize: 20, color: '#ffffff' } );

    let newCounter = 0;
    let rebuildCounter = 0
    
    let newStartingX = 50;
    let rebuildStartingX = 50;
    
    let newY = 135;
    let rebuildY = 380;
    
    let xGapAssemble = 90;

    for (let i = 0; i < furniture.length; i++)
    {
        if (furniture[i].purchased)
        {
            if (!furniture[i].assembled)
            {
                if (newCounter === 8)
                {
                    newStartingX = 50 - (newCounter * xGapAssemble);
                    newY = 205;
                }
                else if (newCounter === 16)
                {
                    newStartingX = 50 - (newCounter * xGapAssemble);
                    newY = 275;
                }
                
                furniture[i].assembleSprite = Assemble.add.sprite(newStartingX + newCounter * xGapAssemble, newY, furniture[i].key);
                
                newCounter++;
            }
            else
            {
                if (rebuildCounter === 8)
                {
                    rebuildStartingX = 50 - (rebuildCounter * xGapAssemble);
                    rebuildY = 450;
                }
                else if (rebuildCounter === 16)
                {
                    rebuildStartingX = 50 - (rebuildCounter * xGapAssemble);
                    rebuildY = 520;
                }
                
                furniture[i].assembleSprite = Assemble.add.sprite(rebuildStartingX + rebuildCounter * xGapAssemble, rebuildY, furniture[i].key);
                
                furniture[i].qualityText = Assemble.add.text(furniture[i].assembleSprite.x + 10, furniture[i].assembleSprite.y + 15, furniture[i].quality + "%", { fontFamily: 'Overpass', fontSize: 20, color: '#ffffff' } );
                
                furniture[i].qualityText.setOrigin(0, 0);
                
                rebuildCounter++;
            }
            
            furniture[i].assembleSprite.setOrigin(0, 0);
            
            furniture[i].assembleSprite.setInteractive();
            
            furniture[i].assembleSprite.on('pointerup', function() 
            {
                clickedFurnitureObject = furniture.find(obj => 
                {
                    return obj.assembleSprite === this;
                });
                
                console.log(clickedFurnitureObject);
                
                // Remove assembleList
                
                for (let i = 0; i < furniture.length; i++)
                {
                    if (furniture[i].purchased)
                    {
                        furniture[i].assembleSprite.destroy();
                    }
                    
                    if (furniture[i].qualityText != undefined)
                    {
                        furniture[i].qualityText.destroy();
                    }
                }
                
                newText.destroy();
                rebuildText.destroy();
                
                step = 0;
                
                assembleDiv = document.createElement('div');
                assembleDiv.classList.add('message');
                assembleDiv.style.cssText = 'position: absolute; top: 110px; left: 20px; width: 760px; height: 450px; overflow: scroll;';
                gameDiv.appendChild(assembleDiv);
                
                titlePara = document.createElement('p');
                titlePara.textContent = "Assembling: " + clickedFurnitureObject.name;
                assembleDiv.appendChild(titlePara);
                
                qualityBarDiv = document.createElement('div');
                qualityBarDiv.style.cssText = 'width: 50%; height: 20px; background: rgba(227, 224, 179, 1); margin: auto;';
                assembleDiv.appendChild(qualityBarDiv);
                
                qualityProgressDiv = document.createElement('div');
                qualityProgressDiv.style.cssText = 'width: 100%; height: 20px; background: rgba(90, 165, 139, 1);';
                qualityBarDiv.appendChild(qualityProgressDiv);
                
                quality = 100;
                
                questionPara = document.createElement('p');
                questionPara.textContent = "";
                assembleDiv.appendChild(questionPara);
                
                answerInput = document.createElement('input');
                answerInput.setAttribute('id', 'answerInput');
                assembleDiv.appendChild(answerInput);
                
                submitButton = document.createElement('button');
                submitButton.classList.add('button');
                submitButton.style.cssText = 'font-size: 20px; padding: 6px; margin-left: 10px; margin-bottom: 10px;'
                submitButton.addEventListener('click', answerSubmitted);
                assembleDiv.appendChild(submitButton);
                
                if (clickedFurnitureObject.level === 1)
                {
                    unit = "cm";
                    
                    randomNum1 = Math.ceil(Math.random() * 10); // 1 -> 10
                    randomNum2 = Math.ceil(Math.random() * 10); // 1 -> 10
                    
                    randomNum3 = Math.ceil(Math.random() * 10) + 10; // 11 -> 20
                    randomNum4 = Math.ceil(Math.random() * 10); // 1 -> 10
                }
                else
                {
                    unit = "m";
                    
                    randomNum1 = Number( (Math.random() + 0.1).toFixed(1) ); // 0.1 -> 1.1
                    randomNum2 = Number( (Math.random() + 0.1).toFixed(1) ); // 0.1 -> 1.1
                    
                    // r3 - r4 must be a whole number
                    
                    randomNum4 = Number( (Math.random() + 0.1).toFixed(1) );// 0.1 -> 1.1
                    randomNum3 = Number( Math.ceil(Math.random() * 4).toFixed(0) ) + randomNum4; // 1 -> 4 + randomNum4
                }
                
                generateQuestion();
            });
        }
    }
}


function generateQuestion()
{
    steps = 
    [
        {
            question: ": The length of the " + clickedFurnitureObject.name + " is " + randomNum1 + unit + " + " + randomNum2 + unit + ". What is its total length?",
            answer: Number((randomNum1 + randomNum2).toFixed(1)),
            hints:
            [
                randomNum1 + unit + " + " + randomNum2 + unit + " = ?" + unit,
                randomNum1 + " + " + randomNum2 + " = " + Number( (randomNum1 + randomNum2).toFixed(1) )
            ]
        },
        {
            question: ": The width of the " + clickedFurnitureObject.name + " is " + randomNum3 + unit + " - " + randomNum4 + unit + ". What is its total width?",
            answer: Number( (randomNum3 - randomNum4).toFixed(1) ),
            hints:
            [
                randomNum3 + unit + " - " + randomNum4 + unit + " = ?" + unit,
                randomNum3 + " - " + randomNum4 + " = " + Number( (randomNum3 - randomNum4).toFixed(1) )
            ]
        },
        {
            question: ": You need to clear some space for the " + clickedFurnitureObject.name + ". Its length is " + (randomNum1 + randomNum2) + unit + " and its width is " + (randomNum3 - randomNum4) + unit + ". What is its area?",
            answer: Number( ( (randomNum1 + randomNum2) * (randomNum3 - randomNum4) ).toFixed(1) ),
            hints:
            [
                "Area = length x width",
                (randomNum1 + randomNum2) + unit + " x " + (randomNum3 - randomNum4) + unit + " = ?" + unit + "\xB2",
                (randomNum1 + randomNum2) + " x " + (randomNum3 - randomNum4) + " = " + Number( ( (randomNum1 + randomNum2) * (randomNum3 - randomNum4) ).toFixed(1) )
            ]
        }
    ];        
    
    questionPara.textContent = "Step " + (step + 1) + steps[step].question;
    
    answerInput.value = "";
    
    submitButton.textContent = "Submit";
    
    let hintsUnlocked = 1;
    
    if (hintDiv != undefined)
    {
        hintDiv.remove();
    }
    
    hintDiv = document.createElement('div');
    assembleDiv.appendChild(hintDiv);
    
    for (let i = 0; i < steps[step].hints.length; i++)
    {
        let accordionButton = document.createElement('button');
        accordionButton.classList.add('button');
        accordionButton.style.cssText = 'width: 100%; margin: 2px; font-size: 20px;';
        accordionButton.id = i + 1;
        accordionButton.textContent = "Hint " + (i + 1);
        hintDiv.appendChild(accordionButton);
        
        let panelDiv = document.createElement('div');
        panelDiv.style.cssText = 'display: none; overflow: hidden;';
        hintDiv.appendChild(panelDiv);
        
        let hintPara = document.createElement('p');
        hintPara.textContent = steps[step].hints[i];
        panelDiv.appendChild(hintPara);
        
        accordionButton.addEventListener('click', function() 
        {
            if (parseInt(this.id) <= hintsUnlocked)
            {
                let nextPanelDiv = this.nextElementSibling;
                
                if (nextPanelDiv.style.display === 'block') 
                {
                    nextPanelDiv.style.display = 'none';
                } 
                else 
                {
                    nextPanelDiv.style.display = 'block';
                }
                
                if (parseInt(this.id) === hintsUnlocked)
                {
                    hintsUnlocked++;
                    
                    if (quality > 0)
                    {
                        quality -= 20;
                        qualityProgressDiv.style.width = quality + "%";
                    }
                }
            }
        });
    }
}


function answerSubmitted()
{
    if (Number(document.getElementById('answerInput').value) === steps[step].answer)
    {
        if (quality < 100)
        {
            quality += 20;
            qualityProgressDiv.style.width = quality + "%";
        }
        
        if (step + 1 === steps.length)
        {
            answerInput.remove();
            submitButton.remove();
            
            clickedFurnitureObject.assembled = true;
            
            clickedFurnitureObject.quality = quality;
            if (quality === 100)
            {
                clickedFurnitureObject.perfected = true;
            }
            
            assembleDiv.remove();
            
            confirmationDiv = document.createElement('div');
            confirmationDiv.classList.add('message');
            confirmationDiv.style.cssText = 'position: absolute; bottom: 280px; left: 100px; width: 600px; height: 120px;';
            gameDiv.appendChild(confirmationDiv);
            
            confirmationPara = document.createElement('p');
            confirmationPara.classList.add("para", "centered");
            confirmationPara.style.cssText = "width: 280px;";
            confirmationPara.textContent = "You assembled: " + clickedFurnitureObject.name + "!";
            confirmationDiv.appendChild(confirmationPara);

            confirmationButton = document.createElement('button');
            confirmationButton.textContent = "Continue";
            confirmationButton.classList.add('button');
            confirmationButton.style.cssText = 'position: absolute; bottom: 200px; left: 325px; width: 150px; height: 60px;';
            confirmationButton.addEventListener('click', returnToAssembleList);
            gameDiv.appendChild(confirmationButton);
        }
        else
        {
            step++;
            
            generateQuestion();
        }
    }
    else
    {
        if (quality > 0)
        {
            quality -= 20;
            qualityProgressDiv.style.width = quality + "%";
        }
        
        submitButton.textContent = "Try again!";
    }
}


function returnToAssembleList() 
{
    confirmationDiv.remove();
    confirmationButton.remove();
    
    createAssembleList();
}


Assemble.update = function(time, delta)
{
    
};