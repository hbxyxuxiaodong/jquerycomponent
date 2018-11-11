/**
 * Created by Administrator on 2017/5/22.
 */
(function($){
  var Tab=function(tab){
    var _this_=this
    this.tab=tab
    //默认配置参数
    this.config={
     //用来定义鼠标的触发类型，是click还是mouseover
     triggerType:'mouseover',
     //用来定义内容切换效果，是直接切入，还是淡入淡出效果
     effect:'default',
     //默认展示第几个tab
     invoke:1,
     //用来定义tab是否自动切换，当制定了事件间隔，就表示自动切换，并且切换时间为指定时间
     auto:false
    }
    if(this.getConfig()){
      $.extend(this.config,this.getConfig())
    }
    //保存tab标签列表、对应的内容列表
    this.tabItems=this.tab.find('ul.tab-nav li');
    this.contentItems=this.tab.find('div.content-warp div.content-item')
    //console.log(this.tabItems)
    //console.log(this.contentItems)
    //console.log(this.config)
    var config=this.config
    console.log(config)
    if(config.triggerType==='click'){
      this.tabItems.on('click',function(){
        //alert('click')
        _this_.invoke($(this))

      })
    }else if(config.type==='mouseover'||config.type!=='click'){
      this.tabItems.on('mouseover',function(){
        //alert('hover')
        _this_.invoke($(this))
      })
    }
    //自动切换功能，当配置了时间，我们就根据时间间隔进行自动切换
    if(config.auto){
      //定义一个全局的定时器
      this.timer=null;
      //计数器
      this.loop=0
      this.autoPlay()
      this.tab.hover(
        function(){
          clearInterval(_this_.timer)
        },
        function(){
          _this_.autoPlay()
        }
      )
    }
    //设置默认显示第几个tab
    if(config.invoke>1){
      this.invoke(this.tabItems.eq(config.invoke-1))
    }
  }
  //tabinit
  Tab.prototype={
    //invoke方法
     autoPlay:function(){
       var _this_=this,
           tabItems=this.tabItems,
           tabLength=tabItems.size(),
           config=this.config;
       this.timer=setInterval(function(){
         _this_.loop++;
         if(_this_.loop>=tabLength){
           _this_.loop=0
         }
         tabItems.eq(_this_.loop).trigger(config.triggerType)
       },config.auto)

     },
     invoke:function(currentTab){
       var _this_=this;
       /**
        * 要执行tab的选中状态，当前选中的加上actived(标记为白底)
        * 切换对应的tab内容，要根据配置参数的effect是default还是fade
        */
       //tab选中状态
       var index=currentTab.index();
       currentTab.addClass('actived').siblings().removeClass('actived')
       //切换对应的内容区域
       var effect=this.config.effect;
       var conItems=this.contentItems;
       if(effect==='default'||effect!=='fade'){
         conItems.eq(index).addClass('current').siblings().removeClass('current')
       }else if(effect=='fade'){
         conItems.eq(index).fadeIn().siblings().fadeOut()
       }
       //如果配置了自动切换，记得把当前的loop值设置成当前的tab的index
       if(this.config.auto){
         this.loop=index;
       }
     },
     getConfig:function(){
       //拿一下tab elem节点上的data-config
       var config =this.tab.attr('data-config')
       console.log(config)
       if(config&&config!=''){
         return $.parseJSON(config)
       }else{
         return null
       }
     }
  }
  Tab.init=function(tabs){
    var _this_=this;
    tabs.each(function(){
      new _this_($(this))
    })
  }
  window.Tab=Tab
})($)