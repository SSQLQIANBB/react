import React,{Component} from 'react';

import Header from './Header';
import axios from 'axios';
import '../less/sortlist.less';
//引入store
// import {tabbar} from '../actions'
// import {connect} from 'react-redux';
class SortList extends Component{
    constructor(){
        super();
        this.state={
            clickpush:'/home',
            name:'首页',
            data:[],

        }
        
    }
    componentWillMount(){
        let cityid=localStorage.id
        if(cityid==''){
            cityid='140'
        }else{
            cityid=localStorage.id
        }
        let cate=Number(window.location.hash.split('?')[1].split('=')[1])+1
        console.log(cate)
        axios.get('https://api.ricebook.com/4/tab/category_product_list.json',{
            params:{
                category_id:cate,
                sort:1,
                from_id:0,
                city_id:cityid,
                page:0
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({
                data:res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log(this.props.tabbarshow)
        // this.props.dispatch({
        //     type:'CHANGE_TABBAR_SHOW',
        //     payload:true
        // })
        
    }
    componentWillUnmount(){
        
    }
    render(){
        return (
            <div className="sortlist">
                <Header default={this.state}/>
                <div className="sl_terms">全部 </div>
                {
                    this.state.data.map(val=>(
                        <div className="sl_content" key={val.product_id}>
                            <div className="Left_sl">
                                <img src={val.product_image}/>
                            </div>
                            <div className="Right_sl">
                                <p>{val.name}</p>
                                <span>{val.price/100}元/{val.show_entity_name}</span>
                                <del>￥{val.original_price/100}</del>
                            </div>
                        </div>
                    ))
                }
                <div className="bottom"></div>
            </div>
        )
    }
}
// let mapStateToProps=state=>({});
// let mapDispatchToProps=dispatch=>{
//     return{
//         changetabbarshow(status){
//             dispatch(tabbar(status))
//         }
//     }
// }
// SortList=connect(mapStateToProps,mapDispatchToProps)(SortList)
export default SortList;