// 直接更新state的多个方法的对象
import {
    RECIEVE_ADDRESS,
    RECIEVE_CATEGORYS,
    RECIEVE_SHOPS,
    RECIEVE_USER_INFO
} from './mutation-types';

export default{
    [RECIEVE_ADDRESS](state, {address}){
        state.address = address
    },
    [RECIEVE_CATEGORYS](state, {categorys}){
        state.categorys = categorys
    },
    [RECIEVE_SHOPS](state, {shops}){
        state.shops = shops
    },
    [RECIEVE_USER_INFO](state, {userInfo}){
        state.userInfo = userInfo
    },
}