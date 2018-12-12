import React,{Component} from 'react';
import axios from 'axios';
import Card from './Card';
import Header from './Header';
//引入样式
import '../less/home.less';
//引入无限滚动组件
import { ListView } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// import { Item } from 'antd-mobile/lib/tab-bar';
//引入store

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            clickpush:'/sort',
            name:'分类',
            dip:'true',
            city:'bj',
            ct_id:'140',
            select:[
                {
                    city:'上海',
                    id:'104'
                },
                {
                    city:'北京',
                    id:'140'
                },
                {
                    city:'南京',
                    id:'144'
                },
                {
                    city:'天津',
                    id:'185'
                },
                {
                    city:'广州',
                    id:'216'
                },
                {
                    city:'成都',
                    id:'235'
                },
                {
                    city:'杭州',
                    id:'260'
                },
                {
                    city:'深圳',
                    id:'299'
                },
                {
                    city:'西安',
                    id:'362'
                }
            ]
        }
        this.cityhandle=this.cityhandle.bind(this)
        this.cityselect=this.cityselect.bind(this)
    }
    //详情页跳转
    handleselect(fir,sec){
        // console.log(fir.split('?')[1].split('=')[1].split('&')[0])
        const  proid=fir.split('?')[1].split('=')[1].split('&')[0];
        this.props.history.push('/goods?product_id='+proid+'&sub_product_id='+sec)
        // product_id:1004528,
        // sub_product_id:5008577
    }
    //城市选择开关
    cityhandle(){
        let dip=this.state.dip
        this.setState({
            dip:!dip,

        })
        // console.log(this.state.dip)
    }
    //城市选择
    cityselect(val){
        let dip=this.state.dip;
        let ct_id=val.id;
        // console.log(id);
        this.setState({
            // seled:[{
            //     city,
            //     id
            // }],
            city:val.city,
            // ct_id:val.id,
            dip:!dip,
        })
        // console.log(this.state.seled)
        console.log('city',this.state.city)
        console.log('id',this.state.ct_id)
        setTimeout(console.log(this.state.ct_id),1000)
        localStorage.setItem('city',val.city)
        localStorage.setItem('id',val.id)
        // location.reload()
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextState,1111,nextProps)
        if(this.state.data!==nextState.data){
            console.log("data")
            return true;
        }
        if(this.state.ct_id!==nextState.ct_id){
            console.log("id")
            axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json',{
                params:{
                    city_id:localStorage.id,
                    page:0
                }
            })
            .then((res)=>{
                // console.log(res.data)
                let data=res.data;
                this.setState({
                    data:data,
                    dip:'true'
                })
            })
            .catch((err)=>{
                console.log(err)
            })
            return true;
        }
        if(this.state.dip!==nextState.dip){
            console.log("dip")
            axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json',{
                params:{
                    city_id:localStorage.id,
                    page:0
                }
            })
            .then((res)=>{
                // console.log(res.data)
                let data=res.data;
                this.setState({
                    data:data,
                    // dip:'true'
                })
            })
            .catch((err)=>{
                console.log(err)
            })
            return true;
        }
        // if(localStorage.id!==nextState.ct_id){
        //     console.log("id")
        //     return true;
        // }
        
            return false
        
    }
    //首次请求数据
    // componentWillMount(){
    //      axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json',{
    //         params:{
    //             city_id:this.state.ct_id,
    //             page:0
    //         }
    //     })
    //     .then((res)=>{
    //         // console.log(res.data)
    //         let data=res.data;
    //         this.setState({
    //             data:data,
    //             dip:'true'
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }
    componentDidMount(){
        if(this.state.ct_id==localStorage.id){
            axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json',{
                params:{
                    city_id:this.state.ct_id,
                    page:0
                }
            })
            .then((res)=>{
                // console.log(res.data)
                let data=res.data;
                this.setState({
                    data:data,
                    dip:'true'
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
            axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json',{
                params:{
                    city_id:localStorage.id,
                    page:0
                }
            })
            .then((res)=>{
                // console.log(res.data)
                let data=res.data;
                this.setState({
                    data:data,
                    dip:'true'
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
        // axios.get('https://api.ricebook.com/hub/home/v1/web/week_choice.json',{
        //     params:{
        //         city_id:this.state.ct_id,
        //         page:0
        //     }
        // })
        // .then((res)=>{
        //     // console.log(res.data)
        //     let data=res.data;
        //     this.setState({
        //         data:data,
        //         dip:'true'
        //     })
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }
    
    render(){
        return (
            <div className="h_box">
                {/* <div>{this.state.city}</div> */}
                <Header default={this.state} cityhandle={this.cityhandle}/>
                {//内容
                    this.state.data.map((item,index)=>{return (
                        <div className="h_content" key={index} style={{display:this.state.dip?"block":"none"}}>
                            <div className="h_title">
                                <h2>{item.group_section.title}</h2>
                                <p>{item.group_section.desc}</p>
                            </div>
                            {
                                item.tabs.map((int,idx)=>{
                                    return(
                                        <div className="h_food" key={idx}  onClick={this.handleselect.bind(this,int.enjoy_url,int.id)}>
                                            <img src={int.url}/>
                                            <p className="p_title">{int.title}</p>
                                            <p className="p_desc">{int.desc}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>)
                    })
                }
                <div className="selCity" style={{display:this.state.dip?"none":"block"}}>
                    <div className="sel_tit">本地服务开通城市</div>
                    {
                        this.state.select.map(val=>(
                            <span className="scity" key={val.id} onClick={this.cityselect.bind(this,val)}>{val.city}</span>
                        ))
                    }
                </div>
                    {/* <Card/> */}
                <div className="bottom"></div>
            </div>
        )
    }
}
export  default Home;