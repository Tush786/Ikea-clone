import { IS_ERROR, IS_LOADING, IS_SUCCESS } from "./CommonActiontype"

const iniState = {
    isLoading: false,
    isError: false,
    isSuccess: false
}

export const CommonReducer = (state=iniState,{type,payload}) => {
    switch(type){
        case IS_LOADING : return {isLoading:true,isError:false,isSuccess:false}
        case IS_ERROR : return {isError:true,isSuccess:false,isLoading:false}
        case IS_SUCCESS: return {isSuccess: true,isError:false,isLoading:false}
        default: return state
    }
}