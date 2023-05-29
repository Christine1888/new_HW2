var ball  //目前要處理的物件,暫時放在ball變數內
 var balls =[] // 一群很多個,把產生"所有"的物件,為物件倉庫
 //+++++++++++++設定飛彈變數
 var bullet //目前要處理的物件,暫時放在bullet變數內
 var bullets=[] //把產生"所有"的物件,為物件倉庫,所有物件都在這
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 var monster
 var monsters=[]
 //+++++++++++++++++++++++++++
 var score =0
 var shipP 
let points = [[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]]; //list資料，大象
var fill_colors = "ccd5ae-e9edc9-fefae0-faedcd-d4a373".split("-").map(a=>"#"+a)
var line_colors = "fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a".split("-").map(a=>"#"+a)
var monster_colors = "0d1b2a-1b263b-415a77-778da9-e0e1dd".split("-").map(a=>"#"+a)


function preload(){    //最早執行的程式碼
  bullet_sound =  loadSound("sound/Launching wire.wav")
}

//class:類別,粒子//先宣告
 class Obj{  //宣告一個類別,針對一個畫的圖案 鼻子
  constructor(args){ //預設值.基本資料(物件的顏色,移動的速度,大小,初始顯示位置...)
    //this.p = args.p||{x:random(width),y:random(height)}  //描述為該物件的初始位置
                                  //||(or),當產生一個物件時,有傳給位置參數,則使用該參數,如果沒有傳參數,就已||後為設定
    this.p = args.p||createVector(random(width),random(height))
    //this.v = {x:random(-1,1),y:random(-1,1)}//設定一個物件移動速度
    this.v =createVector(random(-1,1),random(-1,1))//把原本把原本(x:...,y:.....)改成"向量"
    this.size =random(5,10)  //一個物件的放大倍率
    this.color =random(fill_colors)//充滿顏色
    this.stroke =random(line_colors)//外框線條顏色
  }
  draw(){  //畫出單一個物件形狀
    push()// 執行push()後,依照我的設定,設定原點(0,0)的位置
     translate(this.p.x,this.p.y)//以該物件為原點
     scale(this.v.x<0?1:-1,-1)//x軸放大倍率如果this.v.x<0條件成立,值為1,否則為-1,y軸-1為上下轉
     fill(this.color)
     stroke(this.stroke)
     strokeWeight(4)//線條粗細
     beginShape()
     for(var k=0; k<points.length;k=k+1){
       //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)//須提供兩個點的座標
       //vertex(points[k][0]*this.size,points[k][1]*this.size)//只要設定一個點,當指令到endshape(),會把所有的點串接再一起
       curveVertex(points[k][0]*this.size,points[k][1]*this.size)//畫線為圓弧
    }
    endShape()
    pop() //執行pop()後,原點設定回到整個視窗左上角
  }
  update(){ //移動程式碼
    this.p.x =this.p.x+this.v.x  //x軸目前位置(this.p.x)加上x軸的移動速度(this.v.x)
    this.p.y =this.p.y+this.v.y //y軸目前位置(this.p.y)加上y軸的移動速度(this.v.y)
    this.p.add(this.v) //設定好向量,使用add與上面兩行指令一樣
    
    if(this.p.x<=0||this.p.x>=width){   //x軸碰到左邊(<=0),或是碰到左邊(>=width)
      this.v.x=-this.v.x // 把方向速度改變
    }
    if(this.p.y<=0||this.p.y>=height){  //y軸碰到上邊(<=0),或是碰到下邊(>=height)
      this.v.y=-this.v.y //把y軸方向速度改變

    }
  }
  isBallInRanger(){  //功能:判斷滑鼠按下的位置是否在物件的範圍內
    let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算兩點(滑鼠按下及物件中心)之間的距離,放到d變數內
    if(d<4*this.size){
      return true // 滑鼠與物件的距離小於物件寬度,代表碰觸了,則傳回true的值(碰觸)
    }else{
      return false // 滑鼠與物件的距離大於物件寬度,代表沒有碰觸了,則傳回false的值(沒碰觸)
    }


  }
}

//++++++++++++++++++++++++++++++++++++++++畫怪物++++++++++++++++++++++++++++++++++++++++++++
class Monster{
  constructor(args){//預設值.基本資料(物件的顏色,移動的速度,大小,初始顯示位置...)
      this.r = this.r||random(50,40) //怪物的外圓
      this.p = args.p||createVector(random(width),random(height)) //怪物
      this.v =args.v || createVector(random(-1,1),random(-1,1)) //怪物速度
      this.color = args.color || random(monster_colors) //
      this.mode = random(["happy","bad"])
      this.IsDead = false  //
      this.timenum=0
  }

  draw(){
    if(this.IsDead==false){  //活著時的畫面
      push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()   //不要有框線
        ellipse(0,0,this.r)
          if(this.mode == "happy"){  //眼睛為全圓
              fill(255)
              ellipse(0,0,this.r/2)
              fill(0)
              ellipse(0,0,this.r/3)
          }else{  //眼睛為半圓
              fill(255)
              arc(0,0,this.r/2,this.r/2,0,PI)
              fill(0)
              arc(0,0,this.r/3,this.r/3,0,PI)
           
          }
          //產生腳
        stroke(this.color)
        strokeWeight(4)
        //line(this.r/2,0,this.r,0)
        noFill() ;
          for(var j=0;j<8;j++){
            rotate(PI/4)
            line(this.r/2,0,this.r,0)
            beginShape()
          for(var i=0;i<(this.r/2);i++)
            vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
              }
          endShape()
      pop()
    }else{    //死後的畫面
      this.timenum = this.timenum+1
      push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()   //不要有框線
        ellipse(0,0,this.r)
        stroke(255)
        line(-this.r/3,0,this.r/3,0)  //眼球的線
        //產生腳
        stroke(this.color)
        strokeWeight(4)
        noFill();
        for(var j=0;j<8;j++){
          rotate(PI/4)
          line(this.r/2,0,this.r,0)  //八隻腳產生一個直線
        }
      pop()
    }
  }

  update(){
      this.p.add(this.v)
      if(this.p.x<=0||this.p.x>=width){   //x軸碰到左邊(<=0),或是碰到左邊(>=width)
          this.v.x=-this.v.x // 把方向速度改變
        }
        if(this.p.y<=0||this.p.y>=height){  //y軸碰到上邊(<=0),或是碰到下邊(>=height)
          this.v.y=-this.v.y //把y軸方向速度改變
    
        }
  }
  isBallInRanger(x,y){  //功能:判斷滑鼠按下的位置是否在物件的範圍內
    let d = dist(x,y,this.p.x,this.p.y) //計算飛彈與此物件(怪物)中心位置之間的距離
    if(d<this.r/2){   //飛彈與此物件(怪物)間的距離如果小於半徑，代表碰撞到
      return true // 滑鼠與物件的距離小於物件寬度,代表碰觸了,則傳回true的值(碰觸)
    }else{
      return false // 滑鼠與物件的距離大於物件寬度,代表沒有碰觸了,則傳回false的值(沒碰觸)
    }
  }

} 
//+++++++++++++++++++++++++設定畫points所有點的物件變數

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2);
    for(var i=0;i<10;i=i+1){ //i=0,1,2,4,6,8圈
      ball =new Obj({})   //產生一個新的obj class元件
      balls.push(ball)  //把ball的物件放入balls陣列內
    }
    for(var j=0;j<10;j=j+1){ //i=0,1,2,4,6,8圈
      monster =new Monster({})   //產生一個新的obj class元件
      monsters.push(monster)  //把ball的物件放入balls陣列內
    }


}

function draw() {
  background("#97a97c");
  textSize(30)  //文字大小
  fill("#2f3e46");  //設定顏色
  text("遊戲規則：",50,150)  //顯示文字
  text("打到袋鼠分數+1",50,180)
  text("打到怪物分數-1",50,210)
  if(keyIsPressed){  //鍵盤是否被按下，如果有，keyPressed的值為true
    if(key=="ArrowLeft"|| key=="a" ){ //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight"|| key=="d"){ //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp"|| key=="w"){ //按下鍵盤的往下鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown"|| key=="s"){ //按下鍵盤的往上鍵
      shipP.y = shipP.y+5
    }
  }
  for(let ball of balls){ //陣列的方式,都可以利用此方式處理
  ball.draw()
  ball.update()
    for(let bullet of bullets){  //檢查每一個物件
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
        {
          balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被按滑鼠按到的物件編號,(balls.indexOf(ball))
          bullets.splice(bullets.indexOf(bullet),1)
          score = score +1
        }
  }
  //炸彈顯示
  for(let bullet of bullets) //陣列的方式,都可以利用此方式處理
  {
    
   bullet.draw()
   bullet.update()
  }
  //怪物
  for(let monster of monsters){ //陣列的方式,都可以利用此方式處理
  if(monster.IsDead && monster.timenum>=6){
    monsters.splice(monsters.indexOf(monster),1)
  }
   monster.draw()
   monster.update()
   //++++++++++++++++++++由此判斷，每隻怪物有沒有接觸每一個飛彈
   for(let bullet of bullets){  //檢查每一個物件
    if(monster.isBallInRanger(bullet.p.x,bullet.p.y))
    {
      score = score -1
      //monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出被按滑鼠按到的物件編號,(balls.indexOf(ball))
      monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
      bullets.splice(bullets.indexOf(bullet),1)   
    }
  }
}

}
  textSize(100)
  text(score,50,80) //在座標為(50,80)上,顯示score分數內容
  push()//重新規劃原點(0,0),在視窗中間
  let dx =mouseX - width/2
  let dy =mouseY - height/2
  let angle =atan2(dy,dx)
   translate(shipP.x,shipP.y)//將原點放中心
   fill("#fcf6bd")
   noStroke()
   rotate(angle)
   triangle(-25,25,-25,-25,50,0)//設定三個點,畫成一個三角形
   ellipse(0,0,50)
   pop()//恢復原本設定,原點(0,0),在視窗中間
}




function mousePressed(){//滑鼠按下
bullet =new Bullet({}) //在滑鼠按下的地方,產生一個新的obj class元件(產生一個飛彈)
bullets.push(bullet)//把bullet的物件放入bullet陣列內(丟到倉庫)
bullet_sound.play()
}

function keyPressed(){
  if(key==" "){
    bullet = new Bullet({}) //在滑鼠按下的地方,產生一個新的obj class元件(產生一個飛彈)
    bullets.push(bullet)//把bullet的物件放入bullet陣列內(丟到倉庫)
    bullet_sound.play()
  }
  
}