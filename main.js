const canvas = document.getElementById('myCanvas');

var gameInfo={
	money:100,
	mode:'normal',
	placing:null,
	price:0,
	convSpeed:1,
	susAmongusLevel:0,
	meterRise:2,
	meterRiseChance:1,
	currentDay:0,
}
let context = canvas.getContext('2d')
var coords = [0,0];

onmousedown=function(e){
    var C = coords; // one global lookup
    C[0] = e.pageX; 
    C[1] = e.pageY; 
};
var box_area = { 
	x1: null, 
	y1: null,
	x2: null,
	y2: null,
}
function is_mouse_in_area() {
    var C = coords, B = box_area;
    if (C[0] >= B.x1 && C[0] <= B.x2) {
        if (C[1] >= B.y1 && C[1] <= B.y2) {
            return true;
        }
    }
    return false;
		
};


let placeOptions=[
	{//0
		unlocked:true,
		texture:"convUp.png",
		price:10,
		x:10,
		y:50,
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//0
	{//1
		unlocked:true,
		texture:"generator.png",
		price:50,
		x:10,
		y:50+75,//the power of being lazy and putting stuff off for the future will ensure this is never changed
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
		
	},//1
	{//2
		unlocked:true,
		texture:"seller.png",
		price:10,
		x:10+55,//mAy ThE lAzY rEjEcT yOu
		y:50+75,//the power of lazy is getting worse, and I dont care enough to fix it
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		}
	},//2
	{//3
		unlocked:true,
		texture:"upgraderblue.png",
		price:50,
		x:10,
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//3
	{//4
		unlocked:true,
		texture:"upgraderred.png",
		price:60,
		x:10+55,
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//4
	{//5
		unlocked:true,
		texture:"upgraderpurple.png",
		price:70,
		x:(10+55)+55,
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},

	},//5
	{//6
		unlocked:true,
		texture:"upgraderblack.png",
		price:80,
		x:(10+55)+(55+55),
		//my lazy has supassed enough boundaries to allow logic to happen, allowing eaiser explanation and execution, of my 
		y:(50+75)+75,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//6
	{//7
		unlocked:true,
		texture:"sellTower.png",
		price:0,
		x:10,
		//my lazy has supassed enough boundaries to allow logic to happen, allowing eaiser explanation and execution, of my 
		y:((50+75)+(75+75))*1.95,//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("Seller", this.x,this.y);
		},
	},//7
	{//7
		unlocked:true,
		texture:"convUpgradeDown.png",
		price:1000,
		x:10,
		//my lazy has supassed enough boundaries to allow logic to happen, allowing eaiser explanation and execution, of my 
		y:(50+75)+(75+75),//MY POWER GROWS
		draw(){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = this.texture
        	ctx.drawImage(imagee,this.x,this.y)
   		context.fillStyle = "white";
   		context.font = "bold 18px serif";
   		context.fillText("$"+this.price, this.x,this.y);
		},
	},//7
];









var coords = [0,0];
onmousedown=function(e){
    var C = coords; // one global lookup
    C[0] = e.pageX; 
    C[1] = e.pageY; 
};
var box_area = { 
	x1: null, 
	y1: null,
	x2: null,
	y2: null,
}
function is_mouse_in_area() {
    var C = coords, B = box_area;
    if (C[0] >= B.x1 && C[0] <= B.x2) {
        if (C[1] >= B.y1 && C[1] <= B.y2) {
            return true;
        }
    }
    return false;
		
};



var btnWidth=null
function drawFieldSlotFAKE(x,y,id){
	 btnWidth=50
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var image = new Image();
    image.src = id;
    ctx.drawImage(image,x,y);
	 box_area.x1=x
	 box_area.y1=y
	 box_area.x2=x+btnWidth
	 box_area.y2=y+btnWidth

}


let x=0
let y=0
onmousemove = function(e){
    x=e.clientX;
    y=e.clientY;
};

let btnId=0
let floor=[
]
function addFloor(xx,yy,io,tex,overleay){
	floor.push(
		{
			x:xx,
			y:yy,
			id:io,
			texture:tex,
			cooldown:0,
			overlay:overleay,
		}
	);	
}


document.addEventListener('keyup',function(evt){
   if(evt.keyCode==39){//left
		let sel=gameInfo.placing
		if(sel){
			if(sel=='convUp.png'){
				gameInfo.placing='convRight.png'	
			}
			else if(sel=='convRight.png'){
				gameInfo.placing='movything.png'	
			}
			else if(sel=='movything.png'){
				gameInfo.placing='convLeft.png'	
			}
			else if(sel=='convLeft.png'){
				gameInfo.placing='convUp.png'	
			}
		}
	}
})


let firstRun=true


var convs = new Array()
convs = [
	"movything.png",
	"convUp.png",
	"convRight.png",
	"convLeft.png",
	"moveitem1.png",
	"moveitemblue.png",
	"moveitemred.png",
	"moveitempurple.png",
	"moveitemblack.png",
	
	
	"moveitem1UP.png",
	"moveitemblueUP.png",
	"moveitemredUP.png",
	"moveitempurpleUP.png",
	"moveitemblackUP.png",
	
	
	"moveitem1RIGHT.png",
	"moveitemblueRIGHT.png",
	"moveitemredRIGHT.png",
	"moveitempurpleRIGHT.png",
	"moveitemblackRIGHT.png",
	
	
	"moveitem1LEFT.png",
	"moveitemblueLEFT.png",
	"moveitemredLEFT.png",
	"moveitempurpleLEFT.png",
	"moveitemblackLEFT.png",
]


var convsHold = new Array()
convsHold = [
	"moveitem1.png",
	"moveitemblue.png",
	"moveitemred.png",
	"moveitempurple.png",
	"moveitemblack.png",
	
	
	"moveitem1UP.png",
	"moveitemblueUP.png",
	"moveitemredUP.png",
	"moveitempurpleUP.png",
	"moveitemblackUP.png",
	
	
	"moveitem1RIGHT.png",
	"moveitemblueRIGHT.png",
	"moveitemredRIGHT.png",
	"moveitempurpleRIGHT.png",
	"moveitemblackRIGHT.png",
	
	
	"moveitem1LEFT.png",
	"moveitemblueLEFT.png",
	"moveitemredLEFT.png",
	"moveitempurpleLEFT.png",
	"moveitemblackLEFT.png",
]





var convsRight = new Array()
convsRight = [
	"moveitem1RIGHT.png",
	"moveitemblueRIGHT.png",
	"moveitemredRIGHT.png",
	"moveitempurpleRIGHT.png",
	"moveitemblackRIGHT.png",
]
var convsLeft = new Array()
convsLeft = [
	"moveitem1LEFT.png",
	"moveitemblueLEFT.png",
	"moveitemredLEFT.png",
	"moveitempurpleLEFT.png",
	"moveitemblackLEFT.png",
]
var convsUp = new Array()
convsUp = [
	"moveitem1UP.png",
	"moveitemblueUP.png",
	"moveitemredUP.png",
	"moveitempurpleUP.png",
	"moveitemblackUP.png",
]
var convsDown = new Array()
convsDown = [
	"moveitem1.png",
	"moveitemblue.png",
	"moveitemred.png",
	"moveitempurple.png",
	"moveitemblack.png",
]










function conveyorMovement(i,convType){
	if(convsDown.includes(convType)){//goes \/
		let nextConv=floor[i+20]
		let conv=floor[i]
		if(nextConv.texture=='movything.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				conv.texture=nextConv.texture
				nextConv.texture=convType
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='convRight.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1.png'){
					nextConv.texture='moveitem1RIGHT.png'
				}
				if(conv.texture=='moveitemblue.png'){
					nextConv.texture='moveitemblueRIGHT.png'
				}
				if(conv.texture=='moveitemred.png'){
					nextConv.texture='moveitemredRIGHT.png'
				}
				if(conv.texture=='moveitempurple.png'){
					nextConv.texture='moveitempurpleRIGHT.png'
				}
				conv.texture='movything.png'
				if(conv.texture=='moveitemblack.png'){
					nextConv.texture='moveitemblackRIGHT.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='convLeft.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1.png'){
					nextConv.texture='moveitem1LEFT.png'
				}
				if(conv.texture=='moveitemblue.png'){
					nextConv.texture='moveitemblueLEFT.png'
				}
				if(conv.texture=='moveitemred.png'){
					nextConv.texture='moveitemredLEFT.png'
				}
				if(conv.texture=='moveitempurple.png'){
					nextConv.texture='moveitempurpleLEFT.png'
				}
				if(conv.texture=='moveitem1.png'){
					nextConv.texture='moveitem1LEFT.png'
				}
				conv.texture='movything.png'
				if(conv.texture=='moveitemblack.png'){
					nextConv.texture='moveitemblackLEFT.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
	}
	
	
	
	if(convsLeft.includes(convType)){//goes <-----
		let nextConv=floor[i-1]
		let conv=floor[i]
		if(nextConv.texture=='convLeft.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				conv.texture=nextConv.texture
				nextConv.texture=convType
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='convUp.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1LEFT.png'){
					nextConv.texture='moveitem1UP.png'
				}
				if(conv.texture=='moveitemblueLEFT.png'){
					nextConv.texture='moveitemblueUP.png'
				}
				if(conv.texture=='moveitemredLEFT.png'){
					nextConv.texture='moveitemredUP.png'
				}
				if(conv.texture=='moveitempurpleLEFT.png'){
					nextConv.texture='moveitempurpleUP.png'
				}
				conv.texture='convLeft.png'
				if(conv.texture=='moveitemblackLEFT.png'){
					nextConv.texture='moveitemblackUP.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='movything.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1LEFT.png'){
					nextConv.texture='moveitem1.png'
				}
				if(conv.texture=='moveitemblueLEFT.png'){
					nextConv.texture='moveitemblue.png'
				}
				if(conv.texture=='moveitemredLEFT.png'){
					nextConv.texture='moveitemred.png'
				}
				if(conv.texture=='moveitempurpleLEFT.png'){
					nextConv.texture='moveitempurple.png'
				}
				if(conv.texture=='moveitem1LEFT.png'){
					nextConv.texture='moveitem1.png'
				}
				conv.texture='convLeft.png'
				if(conv.texture=='moveitemblackLEFT.png'){
					nextConv.texture='moveitemblack.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
	}
	
	
	
	
	
	if(convsUp.includes(convType)){//goes /\
		let nextConv=floor[i-20]
		let conv=floor[i]
		if(nextConv.texture=='convUp.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				conv.texture=nextConv.texture
				nextConv.texture=convType
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='convRight.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1UP.png'){
					nextConv.texture='moveitem1RIGHT.png'
				}
				if(conv.texture=='moveitemblueUP.png'){
					nextConv.texture='moveitemblueRIGHT.png'
				}
				if(conv.texture=='moveitemredUP.png'){
					nextConv.texture='moveitemre1RIGHT.png'
				}
				if(conv.texture=='moveitempurpleUP.png'){
					nextConv.texture='moveitempurpl1RIGHT.png'
				}
				if(conv.texture=='moveitem1UP.png'){
					nextConv.texture='moveitem1RIGHT.png'
				}
				conv.texture='convUp.png'
				if(conv.texture=='moveitemblackUP.png'){
					nextConv.texture='moveitemblac1RIGHT.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='convLeft.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1UP.png'){
					nextConv.texture='moveitem1LEFT.png'
				}
				if(conv.texture=='moveitemblueUP.png'){
					nextConv.texture='moveitemblueLEFT.png'
				}
				if(conv.texture=='moveitemredUP.png'){
					nextConv.texture='moveitemre1LEFT.png'
				}
				if(conv.texture=='moveitempurpleUP.png'){
					nextConv.texture='moveitempurple1LEFT.png'
				}
				if(conv.texture=='moveitem1UP.png'){
					nextConv.texture='moveitem1LEFT.png'
				}
				conv.texture='convUp.png'
				if(conv.texture=='moveitemblackUP.png'){
					nextConv.texture='moveitemblac1LEFT.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
	}
	
	
	
	if(convsRight.includes(convType)){//goes ---->
		let nextConv=floor[i+1]
		let conv=floor[i]
		if(nextConv.texture=='convRight.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				conv.texture=nextConv.texture
				nextConv.texture=convType
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='convUp.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1RIGHT.png'){
					nextConv.texture='moveitem1UP.png'
				}
				if(conv.texture=='moveitemblueRIGHT.png'){
					nextConv.texture='moveitemblueUP.png'
				}
				if(conv.texture=='moveitemredRIGHT.png'){
					nextConv.texture='moveitemredUP.png'
				}
				if(conv.texture=='moveitempurpleRIGHT.png'){
					nextConv.texture='moveitempurpleUP.png'
				}
				if(conv.texture=='moveitem1RIGHT.png'){
					nextConv.texture='moveitem1UP.png'
				}
				conv.texture='convRight.png'
				if(conv.texture=='moveitemblackRIGHT.png'){
					nextConv.texture='moveitemblackUP.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
		if(nextConv.texture=='movything.png'){
			if(conv.cooldown>=20-gameInfo.convSpeed){
				conv.cooldown=0
				if(conv.texture=='moveitem1RIGHT.png'){
					nextConv.texture='moveitem1.png'
				}
				if(conv.texture=='moveitemblueRIGHT.png'){
					nextConv.texture='moveitemblue.png'
				}
				if(conv.texture=='moveitemredRIGHT.png'){
					nextConv.texture='moveitemred.png'
				}
				if(conv.texture=='moveitempurpleRIGHT.png'){
					nextConv.texture='moveitempurple.png'
				}
				if(conv.texture=='moveitem1RIGHT.png'){
					nextConv.texture='moveitem1.png'
				}
				conv.texture='convRight.png'
				if(conv.texture=='moveitemblackRIGHT.png'){
					nextConv.texture='moveitemblack.png'
				}
			}
			else{
				conv.cooldown++
			}
		}
	}
}




function checkGen(i){
	if(floor[i+1].texture=='convRight.png'){
		return "convRight"
	}
	if(floor[i+1].texture=='convUp.png'){
		return "convUp"
	}
	if(floor[i+1].texture=='movything.png'){
		return "movything"
	}
}



var upgraderList = new Array()
upgraderList = [
	"upgraderblue.png",
	"upgraderred.png",
	"upgraderpurple.png",
	"upgraderblack.png",
]
function commitUpgrade(i,genType){
	if(genType=='upgraderblue.png'){
		if(floor[i-1].texture=='moveitem1RIGHT.png'){
			/*
			"if(floor[i-1].texure=='moveitem1RIGHT.png'){"
			-Dylan A
			Dec, 1, 2022
			*/
			floor[i+1].texture='moveitemblueRIGHT.png'	
			floor[i-1].texture='convRight.png'	
		}
	}
	if(genType=='upgraderred.png'){
		if(floor[i-1].texture=='moveitemblueRIGHT.png'){
			floor[i+1].texture='moveitemredRIGHT.png'	
			floor[i-1].texture='convRight.png'	
		}
	}
	
	if(genType=='upgraderpurple.png'){
		if(floor[i-1].texture=='moveitemredRIGHT.png'){
			floor[i+1].texture='moveitempurpleRIGHT.png'	
			floor[i-1].texture='convRight.png'	
		}
	}
	if(genType=='upgraderblack.png'){
		if(floor[i-1].texture=='moveitempurpleRIGHT.png'){
			floor[i+1].texture='moveitemblackRIGHT.png'	
			floor[i-1].texture='convRight.png'	
		}
	}
}









var dayTicks=0
window.requestAnimationFrame(gameLoop);
function gameLoop(timeStamp) {	
	dayTicks++
	if(dayTicks>1000){
		gameInfo.currentDay++
		dayTicks=0
	}
   context.fillStyle = '#36393f';
   context.clearRect(0, 0, canvas.width, canvas.height);//clearing for next frame
   context.fillRect(0, 0, canvas.width, canvas.height);//background color, put here so stuff after is over it
   context.fillStyle = '#494d55';
   context.fillRect(0, 25, 250, 700);
   context.fillStyle = '#FF0000';
   context.fillRect(0, 595, gameInfo.susAmongusLevel, 50);
   var c=document.getElementById("myCanvas");
   var ctx=c.getContext("2d");
   var imagee = new Image();
	imagee.src='susmeter.png'
   ctx.drawImage(imagee,0,595)
	
	
	for(let e=100;e<700;e+=50){//field
		for(let i=300;i<1300;i+=50){
       	var c=document.getElementById("myCanvas");
        	var ctx=c.getContext("2d");
        	var imagee = new Image();
        	imagee.src = 'floor.png'
			if(firstRun){
				addFloor(i,e,btnId,"floor.png",null)
				btnId++
				if(btnId>240){
					firstRun=false
				}
			}
		}
	}
	
	
	
	
	
	for (let i = 0, len = placeOptions.length; i < len; i++) {
		let targ=placeOptions[i]
		if(targ.unlocked){
			targ.draw()
			box_area.x1=targ.x
	 		box_area.y1=targ.y
	 		box_area.x2=targ.x+50
	 		box_area.y2=targ.y+50
			if(is_mouse_in_area()){
				if(targ.texture !='convUpgradeDown.png'){
					gameInfo.placing=targ.texture
					gameInfo.price=1
   	 			var C = coords;
   	 			C[0] = 0; 
   	 			C[1] = 0; 
				}
				else{
					gameInfo.convSpeed++
   	 			var C = coords;
   	 			C[0] = 0; 
   	 			C[1] = 0; 
				}
			}
		}
	}	
	for (let i = 0, len = floor.length; i < len; i++) {
		if(gameInfo.convSpeed>1){
			if(floor[i].texture=='convUp.png'){
				floor[i].overlayTexture='convUpgradeUp.png'	
			}
			if(floor[i].texture=='convLeft.png'){
				floor[i].overlayTexture='convUpgradeLeft.png'	
			}
			if(floor[i].texture=='convRight.png'){
				floor[i].overlayTexture='convUpgradeRight.png'	
			}
			if(floor[i].texture=='movything.png'){
				floor[i].overlayTexture='convUpgradeDown.png'	
			}
		}
		
		
		let targ=floor[i]
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      var imagee = new Image();
		imagee.src=targ.texture
     	ctx.drawImage(imagee,targ.x,targ.y)
		
		
		if(targ.overlayTexture !=null){
      	var c=document.getElementById("myCanvas");
      	var ctx=c.getContext("2d");
      	var imagee = new Image();
			imagee.src=targ.overlayTexture
     		ctx.drawImage(imagee,targ.x,targ.y)
		}

		if(gameInfo.placing){
			box_area.x1=targ.x
	 		box_area.y1=targ.y
	 		box_area.x2=targ.x+50
	 		box_area.y2=targ.y+50
			if(is_mouse_in_area()){
				if(gameInfo.placing != 'sellTower.png' && gameInfo.money>gameInfo.price){
					targ.texture=gameInfo.placing
   	 			var C = coords;
   	 			C[0] = 0; 
   	 			C[1] = 0; 
					for (let i = 0, len = placeOptions.length; i < len; i++) {
						if(placeOptions[i].texture==gameInfo.placing){
							gameInfo.money-=placeOptions[i].price	
						}
					}
				}
				
				else{
					let tex=targ.texture//80% decrease, maybe 10%-30% instead
					for (let i = 0, len = placeOptions.length; i < len; i++) {
						if(placeOptions[i].texture==targ.texture){
							let discount = placeOptions[i].price*0.8
							let final=placeOptions[i].price-discount
							gameInfo.money+=final
						}
					}
					targ.texture='floor.png'
				}
			}
		}

		
		if(targ.texture=='generator.png'){
			if(checkGen(i)=='convRight'){
				floor[i+1].texture='moveitem1RIGHT.png'	
			}
			if(checkGen(i)=='convUp'){
				floor[i+1].texture='moveitem1UP.png'	
			}
			if(checkGen(i)=='movything'){
				floor[i+1].texture='moveitem1.png'	
			}
		}
		
		
		if(upgraderList.includes(targ.texture)){
			commitUpgrade(i,targ.texture)
		}
				
		if(targ.texture=='seller.png'){
			if(floor[i+1].texture=='moveitem1LEFT.png'){
				gameInfo.money+=2
				floor[i+1].texture='convLeft.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-1].texture=='moveitem1RIGHT.png'){
				gameInfo.money+=2
				floor[i-1].texture='convRight.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i+20].texture=='moveitem1UP.png'){
				gameInfo.money+=2
				floor[i+20].texture='convUp.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-20].texture=='moveitem1.png'){
				gameInfo.money+=2
				floor[i-20].texture='movything.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			
			
			if(floor[i+1].texture=='moveitemblueLEFT.png'){
				gameInfo.money+=10
				floor[i+1].texture='convLeft.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-1].texture=='moveitemblueRIGHT.png'){
				gameInfo.money+=10
				floor[i-1].texture='convRight.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i+20].texture=='moveitemblueUP.png'){
				gameInfo.money+=10
				floor[i+20].texture='convUp.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susU>=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-20].texture=='moveitemblue.png'){
				gameInfo.money+=10
				floor[i-20].texture='movything.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			
			
			if(floor[i+1].texture=='moveitemredLEFT.png'){
				gameInfo.money+=20
				floor[i+1].texture='convLeft.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-1].texture=='moveitemredRIGHT.png'){
				gameInfo.money+=20
				floor[i-1].texture='convRight.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i+20].texture=='moveitemredUP.png'){
				gameInfo.money+=20
				floor[i+20].texture='convUp.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-20].texture=='moveitemred.png'){
				gameInfo.money+=20
				floor[i-20].texture='movything.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			
			
			
			if(floor[i+1].texture=='moveitempurpleLEFT.png'){
				gameInfo.money+=40
				floor[i-1].texture='convLeft.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-1].texture=='moveitempurpleRIGHT.png'){
				gameInfo.money+=40
				floor[i-1].texture='convRight.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i+20].texture=='moveitempurpleUP.png'){
				gameInfo.money+=40
				floor[i+20].texture='convUp.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			if(floor[i-20].texture=='moveitempurple.png'){
				gameInfo.money+=40
				floor[i-20].texture='movything.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2 && gameInfo.susAmongusLevel<200){
					gameInfo.susAmongusLevel+= gameInfo.meterRise/2
				}
			}
			
			
			
			if(floor[i+1].texture=='moveitemblackLEFT.png'){
				gameInfo.money+=100
				floor[i-1].texture='convLeft.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2){
					gameInfo.susAmongusLevel+= gameInfo.meterRise
				}
			}
			if(floor[i-1].texture=='moveitemblackRIGHT.png'){
				gameInfo.money+=100
				floor[i-1].texture='convRight.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2){
					gameInfo.susAmongusLevel+= gameInfo.meterRise
				}
			}
			if(floor[i+20].texture=='moveitemblackUP.png'){
				gameInfo.money+=100
				floor[i+20].texture='convUp.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2){
					gameInfo.susAmongusLevel+= gameInfo.meterRise
				}
			}
			if(floor[i-20].texture=='moveitemblack.png'){
				gameInfo.money+=100
				floor[i-20].texture='movything.png'
				var susUp = Math.floor(Math.random() * gameInfo.meterRiseChance);
				if(susUp=2){
					gameInfo.susAmongusLevel+= gameInfo.meterRise
				}
			}
		}
		if(convs.includes(targ.texture)){
			conveyorMovement(i,targ.texture)

		}
		

		

		
		
		
	}
	
	
	if(gameInfo.placing){
   	var c=document.getElementById("myCanvas");
   	var ctx=c.getContext("2d");
   	var imagee = new Image();
   	imagee.src = gameInfo.placing
   	ctx.drawImage(imagee,x-35,y-35);
	}
	
	
	
	
	
   context.fillStyle = "white";
   context.font = "bold 18px serif";
   context.fillText("Money: "+gameInfo.money, (canvas.width / 2) - 650, (canvas.height / 2+300));
   context.fillText("Selected: "+gameInfo.placing, (canvas.width / 2) - 650, (canvas.height / 2+330));
   context.fillText("Day "+gameInfo.currentDay+"   (" +(1000-dayTicks)+" Until Next Day)", (canvas.width / 2) - 650, (canvas.height / 2+349));


    window.requestAnimationFrame(gameLoop);
}
