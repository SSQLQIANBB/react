let initState={
    tabbarshow:false
}
let reducer = (state=initState,action)=>{
    switch (action.type){
        case 'CHANGE_TABBAR_SHOW':
            return{
                ...state,
                tabbarshow:action.payload
            }
        default:
            return state;
    }
}
export default reducer;