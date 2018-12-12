//首页点击进入的详情页
import React,{Component} from 'react';
import axios from 'axios';
import Header from './Header';
import { Carousel, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../less/goods.less';
//引入store
import {tabbar} from '../actions'
import {connect} from 'react-redux';
class Goods extends Component{
    constructor(){
        super();
        this.state={
            clickpush:'/home',
            name:'首页',
            banner:[{},{}],
            data:[],
            basic:[]
        }
    }
    componentWillMount(){
        console.log(window.location.hash.split('?')[1])
        let hash=window.location.hash.split('?')[1];
        let proid=hash.split('&')[0].split('=')[1];
        let subid=hash.split('&')[1].split('=')[1];
        axios.get('https://api.ricebook.com/product/info/product_detail.json',{
            params:{
                product_id:proid,
                sub_product_id:subid
            }
        })
        .then((res)=>{
            console.log(res.data)
            let data=res.data
            this.setState({
                data:data,
                basic:data.basic,
                banner:data.basic.product_images
            })
            console.log(this.state.data.basic.product_images)
        })
        .catch((err)=>{
            console.log(err)
        })
        this.props.changetabbarshow(true)
    }
    componentWillUnmount(){
        this.props.changetabbarshow(false)
    }
    render(){
       
        return (
            <div className="goods">
                <Header default={this.state}/>
                <div className="g_banner">
                    <WingBlank>
                        <Carousel
                        autoplay={true}
                        infinite
                        // slideWidth='750px'
                        >
                        {this.state.banner.map(val => (
                            <a
                            key={val.img_url}
                            // style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                            <img
                                src={val.img_url}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                // this.setState({ imgHeight: 'auto' });
                                }}
                            />
                            </a>
                        ))}
                        </Carousel>
                    </WingBlank>
                </div>
                <div className="goods_title">
                    <p className="p_name">{this.state.basic.name}-{this.state.basic.spec}</p>
                    <p className="p_desc">{this.state.basic.description}</p>
                    <p className="p_price">
                        <span className="pr_now">{this.state.basic.price/100}元/位</span>
                        <del className="pr_ori">￥{this.state.basic.origin_price/100}</del>
                        <span className="pridesc">随时退</span>
                    </p>
                </div>
            </div>
        )
    }
}
let mapStateToProps=state=>({});
let mapDispatchToProps=dispatch=>{
    return{
        changetabbarshow(status){
            dispatch(tabbar(status))
        }
    }
}
Goods=connect(mapStateToProps,mapDispatchToProps)(Goods)
export default Goods