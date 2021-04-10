var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed , lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood = createButton("Feed");
  feedFood.position(700 , 95);
  feedFood.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  //write code to read fedtime value from the database
 database.ref("feedTime").on("value",function(data){
   lastFed = data.val()
 })
  //write code to display text lastFed time here
  fill(255)
  textSize(16)


if(lastFed === 12 ){
  text("Last Fed" + lastFed  +"PM" , 350 , 30  )
}
else{
  if(lastFed === 0){
    text("Last Fed 12 AM" , 350 , 30 )
  }
  else{
    if(lastFed > 12){
      console.log(lastFed - 12)
      var l = lastFed - 12 ;
      text("Last Fed : " + l +"PM" , 350 , 30  )
    }
 else{
  text("Last Fed" + lastFed  +"AM" , 350 , 30  )
 }    
  }
}

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  
  dog.addImage(happyDog);
  var foodStock = foodObj.getFoodStock()
  if(foodStock <= 0){
    foodObj.updateFoodStock(foodStock*0)
    
  }
  else{
    foodObj.updateFoodStock(foodStock-1)

  }
database.ref("/").update({
  Food : foodObj.getFoodStock(),
  feedTime : hour(),
  
})

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
