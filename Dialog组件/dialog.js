/**
 * Created by xxd on 2017/5/19.
 * 该js文件依赖于jquery库
 *
 */
(function($){
  var Dialog=function(config){
    var _this_=this;
    this.config={
      //对话框的宽度
      width:'auto',
      //对话框的高度
      height:'auto',
      //对话框的消息
      message:null,
      //对话框的类型
      type:'waiting',
      //对话框的延迟时间
      delay:null,
      //对话框的按钮,
      button:null,
      //对话框遮罩层的透明度
      maskOpacity:null,
      //是否启用动画默认启用
      effect:true
    }
    if(config&&$.isPlainObject(config)){
      $.extend(this.config,config)
    }else{
      this.isConfig=true
    }
    //创建基本的Dom
    this.body=$('body')
    //创建遮罩层
    this.mask=$('<div class="g-dialog-container">')
    //创建弹出框
    this.win=$('<div class="dialog-window">')
    //创建弹出框头部
    this.winheader=$('<div class="dialog-header">')
    //创建提示信息
    this.wincontent=$('<div class="dialog-content">')
    //创建按钮组
    this.winfooter=$('<div class="dialog-footer">')
    //创建对话框
    this.create()
    console.log(this.config)
  };
  //设置弹出框的层级关系
  Dialog.zIndex=10000;
  Dialog.prototype={
    //创建动画的函数
    animate:function(){
      var _this_=this;
       this.win.css('transform','scale(0,0)')
       setTimeout(function(){
         _this_.win.css('transform','scale(1,1)')
       },100)
    },
    create:function(){
     var _this_=this,
       config=this.config,
       mask=this.mask,
       win=this.win,
       header=this.winheader,
       content=this.wincontent,
       footer=this.winfooter,
       body=this.body;
       Dialog.zIndex++;
       mask.css('zIndex',Dialog.zIndex)
     //如果没有传递任何参数
     //就弹出一个等待图标的对话框
     if(this.isConfig){
        win.append(header.addClass(config.type))
        mask.append(win)
        body.prepend(mask)
       if(config.effect){
         this.animate()
       }
        //setTimeout(function(){
        //  _this_.close()
        //},3000)
     }else{
       win.append(header.addClass(config.type))
       if(config.width){
         win.width(config.width)
       }
       if(config.height){
         win.height(config.height)
       }
       if(config.maskOpacity){
         mask.css('background','rgba(0,0,0,+'+config.maskOpacity+')')
       }
       if(config.message){
         win.append(content.append(config.message))
       }
       if(config.delay&&config.delay!=0){
         setTimeout(function(){
           _this_.close()
         },config.delay)
       }
       if(config.button){
         this.createButtons(config.button,footer);
         win.append(footer)
       }
       if(config.effect){
         this.animate()
       }
       mask.append(win)
       body.prepend(mask)
     }
   },
    //创建buttons的方法
    createButtons:function(buttons,footer){
      var _this_=this
      $(buttons).each(function(i){
        var type=this.type?'class='+this.type:''
        var text=this.text?this.text:'按钮'+(++i)
        var callback=this.cb?this.cb:null
        var button=$(`<button ${type}>${text}</button>`)
        if(callback){
          button.on('click',function(){
            var isClose=callback()
            if(isClose!=false){
              _this_.close()
            }
          })
        }else{
          button.on('click',function(){
            _this_.close()
          })
        }
        footer.append(button)
      })
    },
    //删除遮罩层的方法
    close:function(){
      this.mask.remove()
    }
  }
  window.Dialog=Dialog
  $.Dialog=function(config){
    return new Dialog(config)
  }
})($)