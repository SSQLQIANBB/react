
import React,{Component} from 'react';
import {Route,NavLink,Switch,withRouter,Redirect} from 'react-router-dom';
import { TabBar } from 'antd-mobile';
//引入样式
import 'antd-mobile/dist/antd-mobile.css';
import '../less/page.less';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faCompass,faGift,faUser } from '@fortawesome/free-solid-svg-icons'
import Home from './Home';
import Compass from './Compass';
import Gift from './Gift';
import User from './User';
import Sort from './Sort';
import Goods from './Goods';
import SortList from './SortList';
import Login from './Login';
//引入store
import {connect} from 'react-redux';
library.add(faHome,faCompass,faGift,faUser)
class App extends Component{
    constructor(){
        super();
        this.state={
            TabBar:[
                {
                    path:'/home',
                    key:'1',
                    icon:'home',
                },
                {
                    path:'/compass',
                    key:'2',
                    icon:'compass',
                },
                {
                    path:'/gift',
                    key:'3',
                    icon:'gift',
                },
                {
                    path:'/user',
                    key:'4',
                    icon:'user',
                }
            ],
            presentindex:0
        }
    }
    handle(index,path){
        this.setState({
            presentindex:index
        })
        this.props.history.push(path);
        // console.log(this.props.history)
    }
    componentWillMount(){
        // console.log(window.location.hash.slice(1))
        let hash=window.location.hash.slice(1);
        let presentindex=0;
        if(hash=="/"){
            this.setState({
                presentindex
            })
        }
        else{
            this.state.TabBar.some((item,index)=>{
                presentindex=index;
                return hash==item.path;
            })
            this.setState({
                presentindex
            })
        }
        // console.log(this.props)3
    }
    componentDidMount(){
        let hash=window.location.hash.slice(1);
        let presentindex=0;
        if(hash=="/"){
            this.setState({
                presentindex
            })
        }
        else{
            this.state.TabBar.some((item,index)=>{
                presentindex=index;
                return hash==item.path;
            })
            this.setState({
                presentindex
            })
        }
       
    }
    render(){
        return (
            <div className='container'>
            <div className="content">
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/compass' component={Compass}/>
                    <Route path='/gift' component={Gift}/>
                    <Route path='/user' component={User}/>
                    <Route path='/sort' component={Sort}/>
                    <Route path='/goods' component={Goods}/>
                    <Route path='/sortlist' component={SortList}/>
                    <Route path='/login' component={Login}/>
                    <Redirect from='/' to='/home' exact/>
                </Switch>
            </div>
            {/* //下标 */}
            <TabBar tintColor="blue"
            hidden={this.props.tabbarshow}
            >
            {
                this.state.TabBar.map((item,index)=>
                    <TabBar.Item
                    // className={item.title}
                    // title={item.title}
                    key={item.key}
                    icon={<FontAwesomeIcon icon={item.icon} style={{fontSize:"20px"}}/>}
                    selectedIcon={<FontAwesomeIcon style={{fontSize:"20px"}} icon={item.icon}/>}
                    selected={this.state.presentindex==index}
                    onPress={this.handle.bind(this,index,item.path)}
                >
                </TabBar.Item>)
            }
            </TabBar>
        </div>
        )

    }
}
let mapStateToProps=state=>{
    // console.log(state);
    return{
        tabbarshow:state.tabbarshow
    }
}
App=connect(mapStateToProps)(App)
App=withRouter(App);
export default App;