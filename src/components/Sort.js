//分类页
import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import '../less/sort.less';
import Item from 'antd-mobile/lib/popover/Item';
//引入store
import {tabbar} from '../actions'
import {connect} from 'react-redux';
class Sort extends Component{
    constructor(){
        super();
        this.state={
            clickpush:'/home',
            name:'首页',
            data:[]
        }
    }
    handlejump(id){
        this.props.history.push('/sortlist?id='+id);
        this.props.changetabbarshow(false)
    }
    componentWillMount(){
        axios.get('https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTQwJmlzX25ld19sb2NhbD1mYWxzZSZtZDU9MzBlNWZkMzRmYjk4MjgzZjdmZjdhNjNmZTdkYmEyN2QmMjAxODEyMDQxNjAw.json')
        .then((res)=>{
            console.log(res.data)
            let data=res.data;
            this.setState({
                data:data
            })
        })
        console.log(this.props)
        this.props.changetabbarshow(true)
    }
    componentWillUnmount(){
        this.props.changetabbarshow(false)
    }
    render(){
        return (
            <div className="sort">
                <Header default={this.state}/>
                {
                    this.state.data.map((item,idx)=>(
                        <div className="sort_content" key={item.product_count}>
                            <h5>{item.name}</h5>
                            {
                                item.sub_category_list.map((val,idx)=>(
                                    <span key={val.product_count} onClick={this.handlejump.bind(this,val.id)}>{val.name}</span>
                                ))
                            }
                        </div>
                    ))
                }
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
Sort=connect(mapStateToProps,mapDispatchToProps)(Sort)
Sort =withRouter(Sort);
export default Sort;

// api.ricebook.com/4/tab/category_product_list.json?category_id=47&sort=1&from_id=0&city_id=140&page=0
// api.ricebook.com/4/tab/category_product_list.json?category_id=7&sort=1&from_id=0&city_id=140&page=0
// api.ricebook.com/4/tab/category_product_list.json?category_id=5&sort=1&from_id=0&city_id=140&page=0