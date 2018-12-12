import React,{Component} from 'react';
import Header from './Header';
import axios from 'axios';
//走马灯插件
import { Carousel, WingBlank } from 'antd-mobile';
//引入样式
import '../less/compass.less';
import 'antd-mobile/dist/antd-mobile.css';
import Item from 'antd-mobile/lib/popover/Item';
class Compass extends Component{
    constructor(){
        super();
        this.state={
            clickpush:'/home',
            name:'首页',
            
            title:[],
            swip:[],
            swip1:[],
            swip2:[],
            goods:[],
            goods1:[],
            goods1pic:[],
            goods2:[],
            goods2pic:[],
            goods3:[],
            goods3pic:[],
            imgUrl:['https://image.ricebook.com/business/20373785523424?imageView2/2/w/325',
                   ' https://image.ricebook.com/business/20373791223425?imageView2/2/w/325',
                    'https://image.ricebook.com/business/20373794123454?imageView2/2/w/325']
        }
    }
    componentWillMount(){
        let id=localStorage.id
        if(id==''){
            id=140
        }else{
            id=localStorage.id
        }
        axios.get('https://api.ricebook.com/hub/home/v1/web/explore.json',{
            params:{
                city_id:id
            }
        })
        .then((res)=>{
            let {data}=res
            console.log(data[3].data)
            let swip=data[0].data.tabs
            let swip1=data[1].data.tabs
            let swip2=data[2].data.tabs
            let title=data[0].data.group_section
            this.setState({
                title:title,
                swip:swip,
                swip1:swip1,
                swip2:swip2,
                goods:[data[3].data,data[4].data,data[5].data,],
                goods1:data[3].data,
                goods1pic:data[3].data.tabs,
                goods2:data[4].data,
                goods2pic:data[4].data.tabs,
                goods3:data[5].data,
                goods3pic:data[5].data.tabs,
                
            })
            // console.log(this.state.goods)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div className="compass">
                <Header default={this.state}/>
                <div className="caption">
                    <p className="cap_title">{this.state.title.title}</p>
                    <p className="cap_sub">{this.state.title.desc}</p>
                </div>
                <div className="cp_swiper">
                    <WingBlank>
                        <Carousel className="space-carousel"
                        
                        cellSpacing={5}
                        slideWidth={0.9}
                        dots={false}
                        >
                        {this.state.swip.map((val, index) => (
                            <a
                            key={val}

                            style={{
                                display: 'block',
                                position: 'relative',
                                // boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                            }}
                            >
                            <img
                                src={val.url}
                                alt=""
                                style={{ width: '90%', verticalAlign: 'top' }}
                                onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                // this.setState({ imgHeight: 'auto' });
                                }}
                            />
                            <p className="p1">{val.tag}</p>
                            <p className="p2">{val.title}</p>
                            <p className="p3">{val.desc}</p>
                            </a>
                        ))}
                        </Carousel>
                    </WingBlank>
                </div>
                <div className="cp_swiper1">
                    <div className="swiper_contain1">
                        {
                            this.state.swip1.map((item,index)=>(
                                <div key={item.title} className="con_box">
                                    <img src={this.state.imgUrl[index]} />
                                    <div className="img_shad">
                                        <p className="p1">{item.title}</p>
                                        <p className="p2">{item.desc}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="cp_swiper2">
                    <WingBlank>
                        <Carousel className="space-carousel"
                        autoplay
                        infinite
                        cellSpacing={10}
                        slideWidth={0.9}
                        dots={true}
                        >
                        {this.state.swip2.map((val, index) => (
                            <a
                            key={val}

                            style={{
                                display: 'block',
                                position: 'relative',
                                // boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                            }}
                            >
                            <img
                                src={val.url}
                                alt=""
                                style={{ width: '90%', verticalAlign: 'top' }}
                                onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                // this.setState({ imgHeight: 'auto' });
                                }}
                            />
                            <p className="p2">{val.title}</p>
                            </a>
                        ))}
                        </Carousel>
                    </WingBlank>
                </div>
                {
                    this.state.goods.map((item,idx)=>(
                        <div className="com_goods" key={idx}>
                            <div className="g_container">
                                <div className="g_title">
                                    <h3>{item.group_section.title}</h3>
                                    <p>{item.group_section.desc}</p>
                                    <a>{item.group_section.enjoy_url_text}</a>
                                </div>
                                <div className="g_picture">
                                {
                                    item.tabs.map((val,idx)=>(
                                        <img src={val.url} key={val.id}/>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="bottom"></div>
            </div>
        )
    }
}
export  default Compass;