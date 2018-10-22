import React, { Component } from 'react'
import './index.css'

let deg = 0;        // 转盘旋转角度
let prizeIndex = 0; //获取的奖品
//设置奖品，ratio为概率%
let data = [
    { label: '<p>价值</p><p>33888元</p><p>希腊蜜月游</p>', ratio: 0.00003, level: '特等奖', total: 1 },
    { label: '乳胶枕', ratio: 0.007, level: '一等奖', total: 200 },
    { label: '蜜月抱枕', ratio: 0.017, level: '二等奖', total: 500 },
    { label: '现金券200元', ratio: 0.033, level: '三等奖', total: 1000 },
    { label: '现金券100元', ratio: 0.066, level: '三等奖', total: 2000 },
    { label: '现金券50元', ratio: 0.331, level: '三等奖', total: 10000 },
    { label: '蜜月笔记本', ratio: 0.017, level: '幸运奖', total: 500 },
    { label: '盒装纸抽', ratio: 0.53, level: '参与奖', total: 16000 },
];

export default class App extends Component {

    constructor(props) {
        super(props);
        deg = 0;
        prizeIndex = 0;
    }

    componentDidMount() {
        // 奖品数量
        let num = data.length;

        let rotateDeg = 360 / num / 2 + 90;  // 扇形回转角度
        let prizeHtml = [];  // 奖项
        let prizeLevelHtml = []; // 奖项等级
        let turnNum = 1 / num;  // 文字旋转 turn 值

        let ctx = this.canvas.getContext('2d');
        for (let i = 0; i < num; i++) {
            // 绘制外圈
            this.drawCircleCTX(ctx, num, i, rotateDeg, 150, ['#FDF1CF', '#F9D696']);
            // 绘制内圈
            this.drawCircleCTX(ctx, num, i, rotateDeg, 90, ['#FBDB96', '#F8CB75']);
            // 奖项列表
            prizeHtml.push(`<li><div style="transform: rotate(${i * turnNum}turn)"><span>${data[i].label}</span></div></li>`);
            prizeLevelHtml.push(`<li><div style="transform: rotate(${i * turnNum}turn)"><span>${data[i].level}</span></div></li>`);
        }
        
        this.prizeHtml.innerHTML = prizeHtml.join('');
        this.prizeLevelHtml.innerHTML = prizeLevelHtml.join('');
        // 旋转事件-结束
        this.container.addEventListener("transitionend", this.transitionEnd.bind(this));
    }

    componentWillUnmount() {
        this.container.removeEventListener("transitionend", this.transitionEnd.bind(this));
    }

    drawCircleCTX(ctx, num, index,rotateDeg, radius, colors) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(150, 150);
        ctx.moveTo(0, 0);
        ctx.rotate((360 / num * index - rotateDeg) * Math.PI/180);
        ctx.arc(0, 0, radius, 0,  2 * Math.PI / num, false);
        if (index % 2 === 0) {
            ctx.fillStyle = colors[0];
        }else{
            ctx.fillStyle = colors[1];
        }
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#f48d24';
        ctx.stroke();
        ctx.restore();
    }

    /* 转盘旋转结束 */
    transitionEnd () {
        this.label.innerHTML = data[prizeIndex].label
    }

    /* 点击抽奖 */
    onClick () {
        let num = data.length;
        prizeIndex = this.calculateRatio();  //Math.random() * num >>> 0;    // 奖品index
        deg = deg + (360 - deg % 360) + (360 * 10 - prizeIndex * (360 / num)); // 转盘旋转到奖品所需角度
        this.container.style.transform = 'rotate('+ deg +'deg)';
    };

    /* 根据概率计算奖品index */
    calculateRatio () {
        let totalRatio = 0; //总概率
        data.map( item => { totalRatio += item.ratio * item.total });

        let temp = [];
        data.map( (item, index) => {
            for(let i = 0; i < Math.round(item.ratio * item.total / totalRatio * 100); i++){
                temp.push(index)
            }
        });
        //乱序
        temp.sort(() => Math.random() > 0.5 ? -1 : 1);

        let index = Math.random()*temp.length >>> 0;
        return temp[index]
    };

    render() {
        return (
            <div className="lottery-container">
                <div className="lottery-box">
                    <div className="lottery-box-c" ref={ ref => this.container = ref }>
                        <canvas ref={ ref => this.canvas = ref } width="300" height="300" className="lottery-canvas"/>
                        <ul ref={ ref => this.prizeHtml = ref } />
                        <ul className="level" ref={ ref => this.prizeLevelHtml = ref } />
                    </div>
                    <div className="lottery-btn" onClick={this.onClick.bind(this)} >抽奖</div>
                </div>
                <div style={{margin:20}}>
                    <span ref={ ref => this.label = ref } />
                </div>
            </div>
        )
    }

}