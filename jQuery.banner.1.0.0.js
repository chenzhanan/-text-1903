;(function($){
    "use strict"
    //合并的方法
    // $.banner=function(){}
    // $.fn.banner=function(){}
    // $.extend({banner:function(){}})
    // $.fn.extend({function(){}})
    // $.extend($,{banner:function(){}})
    // $.extend($.fn,{banner:function(){}})
    $.fn.banner=function(options){
        // items:$(".imgbox").children(),
        // lift:$("#left"),
        var {list,items,left,right,autoPlay,delayTime,moveTime}=options
        var index=0
        // console.log(right)
        // right:$("#right"),
        // list:true,
        // autoPlay:true,
        // delayTime:3000,
        // moveTime:300
        if(left!=undefined&&left.length>0&&right!=undefined&&right.length>0){
            console.log("有左右按钮")
        }
        list=list===false?false:true;
        autoPlay=autoPlay===false?false:true;
        delayTime=delayTime||2000;
        moveTime=moveTime||200;
        $("<div>").appendTo($("body"))
        if(list){
            
          var str="";
          for(var i=0;i<items.length;i++){
            str+=`<li>${i+1}</li>`
          }
         $('<ul class="list">').html(str).appendTo($("#imgbox"))
        }
        
        $(".list").css({
            display:"flex",
            background:"rgba(200,200,200,0.4)",
            position:"absolute",
            bottom:0,
            margin:0,
            padding:0,
            width:"100%",
            lineHeight: "30px",
            textAlign:"center",
        }).children().css({
            listStyle:"none",
            flex:1
        }).eq(index).css({
            background:"green",
            color:"#fff"
        })
        //list的功能
        $("li").on("click",function(){

            if($(this).index()<index){
                //往右面走
                $("img").eq(index).css({
                    lift:0
                }).animate({left:$("img").width()})
              
                // console.log(index,$(this).index())
                console.log(1)
                $("img").eq($(this).index()).css({
                    left:-800
                   
                }).animate({left:0})
                $("li").eq(index).css({
                    background:"",
                    color:"black"
                })
                $("li").eq($(this).index()).css({
                    background:"green",
                    color:"#fff"
                })
                index=$(this).index()
                
            }else if($(this).index()>index){
                //往左面走
              
                $("img").eq(index).css({
                    left:0
                }).animate({left:-$("img").width()});

                $("img").eq($(this).index()).css({
                    left:$("img").width()
                }).animate({left:0})
                $("li").eq(index).css({
                    background:"",
                    color:"black"
                })
                $("li").eq($(this).index()).css({
                    background:"green",
                    color:"#fff"
                })
               
                index=$(this).index()
            }
           
           
        })
        
        class Anniu{
            constructor(){
                this.left=left,
                this.right=right,
                this.index=index
                this.goindex=0
                this.addEvent()
                
            }
            addEvent(){
                console.log(this.left)
                var that=this
                this.left.on("click",function(){
                    that.changeIndex(0)
                })
                console.log(right)
                this.right.on("click",function(){
                   
                    that.changeIndex(1)
                })
            }
            changeIndex(type){
                
                if(type==0){
                    if(this.index==0){
                        this.index=$("img").length-1;
                        this.goindex=0
                    }else{
                        this.index--;
                        this.goindex=this.index+1;
                    }
                  
                    this.display(1)
                }else{
                    if(this.index==$("img").length-1){
                        this.index=0;
                        this.goindex=$("img").length-1
                    }else{
                        this.index++;
                        this.goindex=this.index-1;
                    }
                    this.display(-1)
                }
                index=this.index
            }
            display(type){
                console.log(this.index,this.goindex)
                $("img").eq(this.goindex).css({left:0})
                $("img").eq(this.goindex).stop().animate({left:$("img").width()*type})
                $("img")[this.index].style.left=$("img")[0].offsetWidth*-type+"px";
                $("img").eq(this.index).stop().animate({left:0})
                $("li").eq(this.index).css({background:"green",color:"#fff"}).siblings().css({background:"",color:"black"})
            }
        }
        new Anniu

        var timer
        timer=setInterval(function(){ 
            right.trigger("click")
        },2000)

        $("#imgbox").hover(function(){
            clearInterval(timer)
        },function(){
            clearInterval(timer)
            timer=setInterval(function(){ 
                right.trigger("click")
            },2000)
           
        })
       
       
    }
})(jQuery);