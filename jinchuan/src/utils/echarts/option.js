/**
 * @Author 张宇辉
 * @Date 2021-03-23 18:02
 * @QQ 1719945567
 * @function 处理返回echart option
 */

/*=================
* 首页饼图
* =================*/
import {echartColors,echartFontSizes} from "./config";
import * as echarts from 'echarts/core';

export const loadHomePieChartOption=(data)=>{
    let colors=echartColors.slice(data.range[0],data.range[1]+1)

    let option = {
        animation:false,
        tooltip: {  //hover提示
            trigger: 'item',
            animation: false,

            position: function (point, params, dom, rect, size) {
                var x = point[0]; //
                var y = point[1];
                var boxWidth = size.contentSize[0];
                var boxHeight = size.contentSize[1];
                var posX = 0; //x坐标位置
                var posY = 0; //y坐标位置

                if (x < boxWidth) { //左边放不开
                    posX = 5;
                } else { //左边放的下
                    posX = x - boxWidth;
                }

                if (y < boxHeight) { //上边放不开
                    posY = 5;
                } else { //上边放得下
                    posY = y - boxHeight;
                }

                return [posX, posY];

            },
            formatter: function (params) {
                let item = params
                var str = "";
                //name------占比
                // `<p style="color:white;padding:0;">${item.seriesName}</p>`
                str += `<div style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:0.05rem 0.2rem;">
                                    <div style="height:100%;display:flex;align-items:center;margin:0;">
                                        <div style="margin:0;width:0.6rem;height:0.6rem;border-radius:50%;background:${item.color};"></div>
                                    <p style="font-size:0.8rem;text-align:left;margin:0;margin-left:0.25rem;color:white;">${item.name}</p>
                                        </div>
                                    <p style="font-size:0.8rem;margin:0;color:white;display:flex;margin-left:0.2rem;">${item.percent.toFixed(1)}%</p>
                                    </div>`

                return str
            },
            extraCssText: `background:url(${require('@/assets/images/echarts-pop-bg.png')});border:none;background-size:100% 100%;padding:0.1rem;`,
        },

        calculable: true,
        color: colors,
        series: [
            {
                name: '占比',
                emphasis:{
                    scale:false,
                },
                label: {
                    show: false
                },
                type: 'pie',
                radius: ['60%', '100%'],
                center: ['50%', '50%'],
                itemStyle: {
                    borderRadius:2
                },
                data: [...data.alarm_infos]
            },

        ]
    };
    return option
}
/*const echartFontSizescale=1;
const echartFontSizes={
    small:parseInt(12*echartFontSizescale),
        normal:parseInt(14*echartFontSizescale),
        big:parseInt(16*echartFontSizescale),
        max_big:parseInt(18*echartFontSizescale),

}*/
export const loadAnalyseLiquid=(value,title,data)=>{

    let option = {
        series: [{
            type: 'liquidFill',
            radius: '85%',
            center: ['50%', '50%'],
            //  shape: 'roundRect',
            data: data,
            backgroundStyle: {
                color: {
                    type: 'linear',
                    x: 1,
                    y: 0,
                    x2: 0.5,
                    y2: 1,
                    colorStops: [{
                        offset: 1,
                        color: 'rgba(68, 145, 253, 0)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(68, 145, 253, .25)'
                    }, {
                        offset: 0,
                        color: 'rgba(68, 145, 253, 1)'
                    }],
                    globalCoord: false
                },
            },
          outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 10,
                    borderColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(69, 73, 240, 0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(69, 73, 240, .25)'
                        }, {
                            offset: 1,
                            color: 'rgba(69, 73, 240, 1)'
                        }],
                        globalCoord: false
                    },
                    shadowBlur: 10,
                    shadowColor: '#000',
                }
            },
             label: {
                 color:"white",
                 fontSize:"1.5rem"
             }
        }]
    };
    return option
}
export const loadAnalyseContentCharts=(key,data,alarmInfos)=>{
    var option;
    let _this = data;
    switch (key) {
        //总览统计
        case 1:
            // var alarmInfos = this.alarmInfos

            var data1 = [];
            var sData=[];
            for (var i = 0; i < alarmInfos.length; i++) {
                data1.push({
                    name: alarmInfos[i].content,
                    value: alarmInfos[i].count
                })
                sData.push(
                    {
                        percent:alarmInfos[i].percent,
                        value:alarmInfos[i].count,
                        itemStyle:{
                            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: hexToRgba(echartColors[i], 1)
                            }, {
                                offset: 1,
                                color: hexToRgba(echartColors[i], 0.1)
                            }]),
                            borderBorderRadius: 5,
                        }}
                )
            }
            var xNames=data1.map(value => {
                return value.name
            })
            xNames.reverse()
            sData.reverse()
            option = {
                animation:false,
                title: {
                    // text: '影视分类统计数据图',
                    x: 'center',
                    y: 'top',
                    textAlign: 'left'
                },
                color: echartColors,
                grid: {
                    left: '2.5%',
                    right: '8%',
                    bottom: '4%',
                    top:"13%",
                    //图形位置包含坐标轴的刻度标签
                    //如果图形位置调整好却不包含坐标轴，坐标轴信息会显示不全
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(params) {
                        let item=params[0]
                        var str = "";
                        //name------占比
                        // `<p style="color:white;padding:0;">${item.seriesName}</p>`
                        str += `<div style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.5rem;">
                                    <div style="height:100%;display:flex;align-items:center;margin:0;">
                                        <div style="margin:0;width:1rem;height:1rem;border-radius:50%;background:${item.color.colorStops[0].color};"></div>
                                    <p style="font-size:1rem;text-align:left;margin:0;margin-left:0.5rem;color:white;">${item.name}</p>
                                        </div>
                                    <p style="font-size:1rem;margin:0;color:white;display:flex;margin-left:0.5rem;">${(item.data.percent*100).toFixed(1)}%</p>
                                    </div>`

                        return str
                    },
                    extraCssText:`background:url(${require('@/assets/images/echarts-pop-bg.png')});border:none;background-size:100% 100%;padding:0.1rem;`,
                },
                xAxis: {
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        },
                    },
                    type: 'value',
                    // min: 0,
                    axisLabel: {
                        formatter: '{value}',
                        color:"white",
                        fontSize:echartFontSizes.small
                    },
                },
                yAxis: {
                    // name: '分类',
                    type: 'category',
                    data:xNames,
                    //y轴线样式
                    axisLine: {
                        show: false
                    },
                    //设置与x轴平行的线(分割线)不显示
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        color:"white",
                        fontSize:echartFontSizes.small
                    }
                },
                series: [{
                    type: 'bar',
                    data: sData,
                    label: {

                            show: true,
                            position: 'right',
                            distance: 5,
                            color: 'white',
                            fontSize:echartFontSizes.small,
                            // backgroundColor:"rgba(0,0,0,0.5)",
                            borderRadius: 20
                    },
                }]
            };
            break;
        //对比统计
        case 2:
       
            var data2 = []
            var mychartData2=_this.mychartData2
            // eslint-disable-next-line no-redeclare
            for (var i = 0; i < mychartData2.length; i++) {
                data2.push({
                    name: mychartData2[i].content,
                    value: mychartData2[i].count,
                    itemStyle:{
                        color:echartColors[i]
                    },
                })
            }

            option = {
                animation:false,
                // backgroundColor:"#fff",
                // color: echartColors,
                legend:{
                    show:false,
                    data:_this.legendData,
                    selected:_this.legendSelected
                },
                grid: {
                    /*                left: -100,
                                    top: 50,
                                    bottom: 10,
                                    right: 10,*/
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        let item=params
                        var str = "";
                        //name------占比
                        // `<p style="color:white;padding:0;">${item.seriesName}</p>`
                        str += `<div style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.5rem;">
                                    <div style="height:100%;display:flex;align-items:center;margin:0;">
                                        <div style="margin:0;width:1rem;height:1rem;border-radius:50%;background:${item.color};"></div>
                                    <p style="font-size:1rem;text-align:left;margin:0;margin-left:0.5rem;color:white;">${item.name}</p>
                                        </div>
                                    <p style="font-size:1rem;margin:0;color:white;display:flex;margin-left:0.5rem;">${item.percent}%</p>
                                    </div>`

                        return str
                    },
                    extraCssText:`background:url(${require('@/assets/images/echarts-pop-bg.png')});border:none;background-size:100% 100%;padding:0.1rem;`,
                },
                polar: {
                    center: ["50%", "55%"],
                    radius: ['20%', '70%'],

                },
                angleAxis: {
                    interval: 1,
                    type: 'category',
                    data: [],
                    z: 10,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B4A6B",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        color: "#0B4A6B",
                        margin: 8,
                        fontSize: 16
                    },
                },
                radiusAxis: {
                    min: 40,
                    max: 120,
                    interval: 20,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B3E5E",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: false,
                        padding: [0, 0, 0, 0],
                        color: "red",
                        fontSize: 16
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.2)",
                            width: 1,
                            type: "solid"
                        }
                    }
                },
                calculable: true,

                series: [
                    {
                        type: 'pie',
                        radius: ["5%", "10%"],
                        center: ["50%", "55%"],

                        labelLine: {
                                show: false,
                                length: 30,
                                length2: 55,

                        },
                        emphasis: {
                            labelLine:{
                                show: false
                            },
                            scale:false,
                        },
                        tooltip:{
                            show:false,
                        },
                        data: [{
                            value: 0,
                            itemStyle: {
                                    color: "rgba(4, 202, 255, 0.5)"
                            }
                        }]
                    }, {
                        type: 'pie',
                        radius: ["90%", "90%"],
                        center: ["50%", "55%"],
                        labelLine: {
                                show: false,
                                length: 30,
                                length2: 55,

                        },
                        emphasis: {
                            scale:false,
                            labelLine:{
                                show: false
                            }
                        },
                        name: "",
                        data: [{
                            name: '',

                        }]
                    }, {
                        stack: 'a',
                        // color: echartColors,
                        type: 'pie',
                        center: ["50%", "55%"],
                        radius: ['20%', '45%'],
                        roseType: 'area',
                        zlevel: 10,
                        label: {
                                show: true,
                                formatter: '{b|{b}} {c|{c}次}',
                                rich: {
                                    b:{
                                        align: 'left',
                                        padding: 4,
                                        color:"white",
                                        fontSize:echartFontSizes.normal
                                    },
                                    hr: {
                                        borderColor: '#12EABE',
                                        width: '100%',
                                        borderWidth: 2,
                                        height: 0
                                    },
                                    d: {
                                        color: '#fff',
                                        align: 'left',
                                        padding: 4
                                    },
                                    c: {

                                        color: '#fff',
                                        align: 'left',
                                        padding: 4,
                                        fontSize:echartFontSizes.small
                                    },

                                position: 'outside'
                            },

                        },
                        emphasis: {
                            label:{
                                show:true,
                            },
                            labelLine:{
                                show: false
                            }
                        },
                        labelLine: {
                                show: true,
                                // length: 15,
                                // length2: 20
                        },
                        data: data2
                    },]
            }
            break;
        //每日统计
        case 3:
            var color = echartColors
            var seriesDatas = []
            var xAxisData = []
            for (const mychartData3Element of _this.mychartData3) {
                xAxisData.push(mychartData3Element.day)
            }
            for (let j = 0; j < _this.mychartData3[0].alarm_infos.length; j++) {
                let data = []
                let name = _this.mychartData3[0].alarm_infos[j].content
                for (let i = 0; i < _this.mychartData3.length; i++) {
                    data.push(_this.mychartData3[i].alarm_infos[j].count)
                }
                seriesDatas.push(getMyChart3SeriesData(j, name, data))
            }


            option = {
                animation:false,
                color: color,
                legend:{
                    show:false,
                    data:_this.legendData,
                    selected:_this.legendSelected
                },
                tooltip: {
                    trigger: "axis",
                    formatter: function (params) {
                        var str = `<p style="color:white;font-size:1.1rem;margin:0;">${params[0].axisValue}日</p>`;
                        params.forEach((item) => {
                            str += `<div style="width:100%;font-size:1rem;height:1.2rem;display:flex;align-items:center;justify-content:space-between;padding:0;">
                                    <div style="height:100%;display:flex;align-items:center;margin:0;">
                                        <div style="margin:0;width:0.8rem;height:0.8rem;border-radius:50%;background:${item.color};"></div>
                                    <p style="text-align:left;margin:0;margin-left:0.2rem;color:white;">${item.seriesName}</p>
                                        </div>
                                    <p style="margin:0;margin-left:0.5rem;color:white;display:flex;">${item.data}次</p>
                                    </div>`
                        })
                        return str
                    },
                    extraCssText: `background:url(${require('@/assets/images/echarts-pop-bg.png')});border:none;background-size:100% 100%;padding:0.5rem;`,
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(255,255,255,0.1)',
                            shadowColor: 'rgba(225,225,225,0.5)',
                            shadowBlur: 5
                        }
                    }
                },
                grid: {
                    width: "90%",
                    height: "70%",
                    top: "23.5%",
                    left: "4%",
                    containLabel: true
                },
                xAxis: [{
                    type: "category",
                    boundaryGap: false,
                    axisLabel: {
                        formatter: '{value}日',
                            color: "white",
                            fontSize: echartFontSizes.normal,
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#D9D9D9"
                        }
                    },
                    data: xAxisData
                }],
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    show: false,
                    end: 100
                }, {
                    show: false,
                    start: 0,
                    end: 100,
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                yAxis: [{
                    type: "value",
                    name: '次数 (每日)',
                    minInterval: 1,
                    axisLabel: {
                            color:"white",
                            fontSize: echartFontSizes.small,
                    },
                    nameTextStyle: {
                        padding:[0,0,echartFontSizes.small/2,0],
                        color: "white",
                        fontSize: echartFontSizes.normal,
                    },
                    splitLine: {
                        lineStyle: {
                            // type: "dashed",
                            color: "rgba(255,255,255,0.3)"
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }],
                series: seriesDatas
            };

            break;
        case 4:
            var seriesDatas4 = []
            var xAxisData4 = []
            for (let j = 0; j < _this.mychartData4[0].alarm_infos.length; j++) {
                let data = []
                let name = _this.mychartData4[0].alarm_infos[j].content
                for (let i = 0; i < _this.mychartData4.length; i++) {
                    if(j==0){
                        xAxisData4.push(_this.mychartData4[i].month)
                    }
                    data.push(_this.mychartData4[i].alarm_infos[j].count)
                }
                seriesDatas4.push(getMyChart4SeriesData(j, name, data))
            }
            option = {
                animation:false,
                // backgroundColor:'#323a5e',
                tooltip: {
                    trigger: "axis",
                    formatter: function (params) {
                        var str = `<p style="color:white;font-size:1.1rem;margin:0;">${params[0].axisValue}月</p>`;
                        params.forEach((item) => {
                            str += `<div style="width:100%;font-size:1rem;height:1.2rem;display:flex;align-items:center;justify-content:space-between;padding:0;">
                                    <div style="height:100%;display:flex;align-items:center;margin:0;">
                                        <div style="margin:0;width:0.8rem;height:0.8rem;border-radius:50%;background:${item.color.colorStops[0].color};"></div>
                                    <p style="text-align:left;margin:0;margin-left:0.2rem;color:white;">${item.seriesName}</p>
                                        </div>
                                    <p style="margin:0;margin-left:0.5rem;color:white;display:flex;">${item.data}次</p>
                                    </div>`
                        })
                        return str
                    },
                    extraCssText: `background:url(${require('@/assets/images/echarts-pop-bg.png')});border:none;background-size:100% 100%;padding:0.5rem;`,
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(255,255,255,0.1)',
                            shadowColor: 'rgba(225,225,225,0.5)',
                            shadowBlur: 5
                        }
                    }
                },
                grid: {
                    width: "90%",
                    height: "70%",
                    top: "23.5%",
                    left: "4%",
                    containLabel: true
                },
                legend:{
                    show:false,
                    data:_this.legendData,
                    selected:_this.legendSelected
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData4,
                    axisLine: {
                        lineStyle: {
                            color: 'white'

                        }
                    },
                    axisLabel: {
                        // interval: 0,
                        // rotate: 40,
                        formatter: '{value}月',
                        // color:"red",
                        fontSize: echartFontSizes.small,

                    },
                },

                yAxis: {
                    name: '次数 (每月)',
                    minInterval:1,
                    nameTextStyle: {
                        padding:[0,0,echartFontSizes.small/2,0],
                        color: "white",
                        fontSize: echartFontSizes.normal,
                    },
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.3)'
                        }
                    },
                    axisLabel: {
                        fontSize: echartFontSizes.small,
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    // start: 0,
                    show: false,
                    // end: 1
                }, {
                    show: false,
                    // start: 0,
                    // end: 1,
                    // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                series: seriesDatas4
            };
            break;
        default:
            break;
    }

    return option
}

const getMyChart4SeriesData = (index, name, data) => {
    return     {
        name: name,
        type: 'bar',
        // barWidth: '15%',
        itemStyle: {
                // color:echartColors[index],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: hexToRgba(echartColors[index], 1)
                }, {
                    offset: 1,
                    color: hexToRgba(echartColors[index], 0.5)
                }]),
                borderRadius: 5,
        },
        data: data
    }
}

const hexToRgba = (hex, opacity) => {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
            "0x" + hex.slice(3, 5)
        )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
}


const getMyChart3SeriesData = (index, name, data) => {
    const color = echartColors
    return {
        name: name,
        type: "line",
        smooth: true,
        // showSymbol: false,/
        symbolSize: 6,
        zlevel: 3,
        lineStyle: {
                color: color[index],
                shadowBlur: 3,
                shadowColor: hexToRgba(color[index], 0.5),
                shadowOffsetY: 8
        },
        areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [{
                        offset: 0,
                        color: hexToRgba(color[index], 0.3)
                    },
                        {
                            offset: 1,
                            color: hexToRgba(color[index], 0.1)
                        }
                    ],
                    false
                ),
                shadowColor: hexToRgba(color[index], 0.1),
                shadowBlur: 10
        },
        data: data,
    }
}