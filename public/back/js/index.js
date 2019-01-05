
// 数据可视化
$(function() {
    // 柱状图
//    初始化
    var myChart = echarts.init(document.querySelector('.content-info .info-left'));
    // 指定配置项
    var option = {
        title: {
            text: '2018注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数','班级']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
        },{
            name: '班级',
            type: 'line',
            data: [15, 23, 6, 10, 20, 15]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})
$(function() {
    // 右侧饼状图
    var myChart = echarts.init(document.querySelector('.content-info .info-right'));
    // 指定配置项
    var option = {
        title : {
            text: '热门品牌销售',
            subtext: '2019年1月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','李宁','安踏','阿迪达斯','鸿星尔克']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'李宁'},
                    {value:234, name:'安踏'},
                    {value:135, name:'阿迪达斯'},
                    {value:1548, name:'鸿星尔克'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})