import React,{Component} from 'react';
import { tabbar } from '../actions';
import {connect} from 'react-redux';
import imgUrl from '../img/2.png';
class Login extends Component{
    componentWillMount(){
        this.props.changetabbarshow(true)
    }
    componentWillUnmount(){
        this.props.changetabbarshow(false)
    }
    render(){
        return (
            <div>
                <img src={imgUrl}/>
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
Login=connect(mapStateToProps,mapDispatchToProps)(Login)
export default Login;