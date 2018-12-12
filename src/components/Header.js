
//头部
import React,{Component} from 'react';
import imgUrl from '../img/1.png';
import '../less/header.less';
import {withRouter} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch)
 class Header extends Component{
    constructor(){
        super();
        this.state={
           
        }
    }
    changepage(path){
        this.props.history.push(path);
        presentIndex:0
        // console.log(this.props.history);

    }
    componentWillMount(){

    }
    handlelogin(){
        this.props.history.push('/login')
    }
    render(){
        let cityname=localStorage.city
        if(cityname==''){
            cityname='北京'
        }else{
            cityname=localStorage.city
        }
        const path=this.props.default.clickpush;
        const name=this.props.default.name;
        // const city=this.props.default.seled[0].city;
        // console.log(city)
        let {cityhandle}=this.props;
        // let {cityselect}=this.props;
        // console.log(this.props.default)
        return (
            <div className="header">
                <div className="h_Left" onClick={this.changepage.bind(this,path)}>{name}</div>
                <div className="h_Middle" onClick={cityhandle}><img src={imgUrl}/><span>{cityname}</span></div>
                <div className="h_Right">
                    <span className="span1" onClick={this.handlelogin.bind(this)}>登录</span>
                    <span className="span2"><FontAwesomeIcon icon='search'/></span>
                </div>
            </div>
        )
    }
}

Header=withRouter(Header)
export default Header;