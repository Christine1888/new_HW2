//定義一個bullet,物件的class
class Bullet{
    constructor(args){//預設值.基本資料(物件的顏色,移動的速度,大小,初始顯示位置...)
     this.r = this.r||10 //設計的飛彈有大有小時,就傳參數,args.r來設定飛彈大小,沒有傳參數,就以10為主
     this.p = args.p||shipP.copy() //建立一個向量,{x:width/2,y:height/2}
     this.v =args.v || createVector(mouseX-width/2,mouseY-height/2).limit(6)
     this.color = args.color ||"#f5cac3"
    }
    draw(){ //匯出物件程式碼
   push()
   translate(this.p.x,this.p.y)
   fill(this.color)
   noStroke()
   ellipse(0,0,this.r)
   pop()
    }
    update(){ //計算移動後的位置
    this.p.add(this.v)
    }
   
   }