$(function() {

    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:4000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        bounce: true //是否启用回弹

    });
    
})