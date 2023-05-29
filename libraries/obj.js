class Obj{  //宣告一個類別,針對一個畫的圖案 鼻子
    constructor(args){ //預設值.基本資料(物件的顏色,移動的速度,大小,初始顯示位置...)
      //this.p = args.p||{x:random(width),y:random(height)}  //描述為該物件的初始位置
                                    //||(or),當產生一個物件時,有傳給位置參數,則使用該參數,如果沒有傳參數,就已||後為設定
      this.p = args.p||createVector(random(width),random(height))
      //this.v = {x:random(-1,1),y:random(-1,1)}//設定一個物件移動速度
      this.v =createVector(random(-1,1),random(-1,1))//把原本把原本(x:...,y:.....)改成"向量"
      this.size =random(15,30)  //一個物件的放大倍率
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
      // 向量sub==>減號
      
      //知道滑鼠的位置,並建立滑鼠的向量
      //let mouseV =createVector(mouseX,mouseY)//滑鼠位置轉換成一個向量值
      //let delta = mouseV.sub(this.p).limit(this.v.mag()*2) //sud計算出滑鼠所在位置向量(mouseV)到物件向量(this.p),每次以3的距離移動,(this.v.mag()*2)為一個大小方向、物件速度大小
      //this.p.add(delta)
  
  
  
      if(this.p.x<=0||this.p.x>=width){   //x軸碰到左邊(<=0),或是碰到左邊(>=width)
        this.v.x=-this.v.x // 把方向速度改變
      }
      if(this.p.y<=0||this.p.y>=height){  //y軸碰到上邊(<=0),或是碰到下邊(>=height)
        this.v.y=-this.v.y //把y軸方向速度改變
  
      }
    }
    //+++++++++++++++++++++++++++++++碰撞函數+++++++++++++++++++++++++++++++++++++++++++++
    isBallInRanger(x,y){  //功能:判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下及物件中心)之間的距離,放到d變數內
      if(d<4*this.size){
        return true // 滑鼠與物件的距離小於物件寬度,代表碰觸了,則傳回true的值(碰觸)
      }else{
        return false // 滑鼠與物件的距離大於物件寬度,代表沒有碰觸了,則傳回false的值(沒碰觸)
      }
  
  
    }
  }