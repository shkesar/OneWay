/*                                                                  game variables                                               */

var cnv , ctx, wth, hgt, xtra, factor=10, isTouching=0, toastX, toastY, i, counter=1, isEnemyPresent=0, level=0, score=0, vSpeed=0, enem_factor=1;


/*                                                                   img variables                                               */
var roadx,bump_left,bump_right,carx, brakex, leftAlt, rgtAlt, enemyCarDim;


/*                                                                   audio variables                                               */
var brake_aud,horn_aud,bg_aud;



/*                                                                   logic variables                                               */
var roadDim,leftBumpDim,rightBumpDim,brakeDim;







/*                                                                   Initialization methods                                             */
function canInit()
{
cnv=document.getElementById('cnv');
cnv.height=window.innerHeight;
cnv.width=window.innerWidth;
ctx=cnv.getContext('2d');
wth=cnv.width;
hgt=cnv.height;


toastX=wth;
toastY=0;
xtra=wth-325;
console.log('Width :  '+cnv.width+' & height : '+cnv.height);
}

function audInit()
{
    bg_aud=new Audio('audio/back.mp3');
    horn_aud=new Audio('audio/horn.mp3');
}

function resInit()
{
    roadx=new Image();
    bump_left=new Image();
    bump_right=new Image();
    carx=new Image();
    hornx=new Image();
    brakex=new Image();
    leftAlt=new Image();
    rightAlt=new Image();
    enemyCar=new Image();
    
    carx.onload=function(){
        console.log('car manufactured..');
    }; 
    carx.src='img/car.png';
    
    roadx.onload=function(){
        console.log('road constructed..');
    };
    roadx.src='img/road.png';
    
    
    bump_left.onload=function(){
    };
    bump_left.src='img/LeftBump.png';
    
    
    bump_right.onload=function(){
    };
    bump_right.src='img/RightBump.png';
    
    
    brakex.onload=function(){console.log('stopppp');};
    brakex.src='img/brakes.png'

    enemyCar.onload=function(){console.log("Bwahahahahha");};
    enemyCar.src='img/one.png';

}


function init(){
    canInit();
    resInit();
    audInit();
    alert('Tap left to honk | right to brake');
}

init();


/*                                                                   Logic inits                                            */

roadDim= {
   x:(xtra/2)+40 , y: hgt-598 
};

leftBumpDim={
    x:xtra/2, y:hgt-598
};

rightBumpDim={
    x:(xtra/2)+285, y:hgt-598
};

carDim={
    x : (xtra/2)+120,
    y: 280,
    speed: 0
};

enemyCarDim={

    x:-10,
    y:-10,
    speed:0
}

/*                                                                       KeyEvents                                            */

window.addEventListener('touchstart', function(e){
    isTouching=1;
    if(e.changedTouches[0].pageX >= wth/2)
    {
        if(isTouching)
        {
        carx.src='img/brakeoncar.png';
        pullBrakes();
        }
    }
    else
    {
        honkHorn();
    }
    

}, false);

window.addEventListener('touchend',function(e){
        isTouching=0;
         carx.src='img/brakeoncar.png';
},false);


window.ondevicemotion = function(event) {
	var xVal = event.accelerationIncludingGravity.x;
    var yVal = event.accelerationIncludingGravity.y;
    if(xVal<0)
    {
        carDim.x=carDim.x + Math.abs(xVal)*10;
        if((carDim.x+87) >= rightBumpDim.x)
        {
            carDim.x=rightBumpDim.x-89;
        }
    }
    else{
        carDim.x=carDim.x - Math.abs(xVal)*10;
        if((carDim.x) <= (xtra/2)+42)
        {
            carDim.x=roadDim.x+2;
        }
    }
}




/*                                                                   Game methods                                             */



function render()
{
    ctx.clearRect(0,0,wth,hgt);
    ctx.drawImage(roadx,roadDim.x,roadDim.y);
    ctx.drawImage(bump_left,leftBumpDim.x,leftBumpDim.y);
    ctx.drawImage(bump_right,rightBumpDim.x,rightBumpDim.y);
    ctx.drawImage(carx,carDim.x,carDim.y); 
    ctx.drawImage(enemyCar,enemyCarDim.x,enemyCarDim.y);

    ctx.font="bold 15px Verdana";
    ctx.fillStyle="#3D9DAA";
    if(score<1000)
    ctx.fillText("distance : "+(score*2.5)+" m",30,20);
    else
    ctx.fillText("distance : "+(score*2.5)/1000+" Kms",10,20);

    ctx.font="bold 15px Verdana";
    ctx.fillStyle="#3D9DAA";
    ctx.fillText("speed : "+vSpeed+"Km/h",190,20);

}


function update()
{
    accelerate();
    if(!isEnemyPresent)
    {
    prepareEnemy();
    placeEnemy();
    }
    else
    {
    moveEnemy();
    }
    
}
function gameLoop()
{
    render();
    if(!checkForCol())
    {
     score++;
     level+=1;
     update();
     //requestAnimationFrame(gameLoop);
    }
    else
    {
       location.href="end.html";
    }
}
//requestAnimationFrame(gameLoop);



setInterval(function(){gameLoop();},1000/30);




/*                                                                  Misc methods                                             */

function accelerate()
{
    carx.src='img/car.png';
    if(carDim.speed<6 && factor % 10)
    {
    carDim.speed = carDim.speed+1;
    }
    factor++;  
    vSpeed=(carDim.speed*18)+7;
    toggle();     
    
}


function toggle()
{
        if(counter%(8-carDim.speed)){
            
            bump_left.src='img/LeftBumpAlternate.png';
            bump_right.src='img/RightBumpAlternate.png';
        }
        else
        {
            bump_left.src='img/LeftBump.png';
            bump_right.src='img/RightBump.png';
        }
        counter++;
    

}


function pullBrakes()
{
    carDim.speed=Math.ceil(carDim.speed/2);   
    vSpeed=carDim.speed*18;
    if(score>10)
    score-=10;
    playAudio("/android_asset/www/audio/brake.mp3");
}


function honkHorn()
{
   playAudio("/android_asset/www/audio/horn.mp3");
}





function prepareEnemy(){

    var cr=Math.floor(Math.random()*6);
    console.log("Car number : "+cr);

    switch(cr)
    {
        case 1:     enemyCar.src='img/one.png';
                    break;
        case 2:     enemyCar.src='img/two.png';
                    break;
        case 3:     enemyCar.src='img/three.png';
                    break;
        case 4:     enemyCar.src='img/four.png';
                    break;
        case 5:     enemyCar.src='img/six.png';
                    break;
    }



}




function placeEnemy(){
    isEnemyPresent=1;
    var decider=(Math.floor(Math.random()*(roadx.width-roadDim.x)));
    console.log("Decider is "+decider);
    if(level%150)
    {
        factor+=0.2;
    }
    enemyCarDim.speed=10+Math.ceil(Math.random()*11)+enem_factor;
    enemyCarDim.x=50+decider;
    if((enemyCar.width+enemyCarDim.x) >= rightBumpDim.x)
    {
        enemyCarDim.x=60;
    }

    enemyCarDim.y=0-(200+Math.floor(Math.random()*200));
}

function moveEnemy()
{
    if(enemyCarDim.y-enemyCar.height<=hgt)
    {
    enemyCarDim.y+=enemyCarDim.speed;
    }
    else
    {
        isEnemyPresent=0;
    }
    
}


function checkForCol()
{
    if (carDim.x < enemyCarDim.x + (enemyCar.width-8) && carDim.x + (carx.width-8) > enemyCarDim.x && carDim.y < enemyCarDim.y + (enemyCar.height-2) && (carx.height-2) + carDim.y > enemyCarDim.y) {
        return 1;
    }
    return 0;
}


function playAudio(src)
{
	var med=new Media(src, succ, fail);
	med.play();
	
	function succ(){}
	function fail(){}
}
