import { defineStore } from "pinia";

import {getDetailInfos} from '@/services/modules/detail'

// pgt给的方法不可行 因为getter内部是个函数 那就失去了computed效果
// const getMainPartModule = (state)=>(module)=>state.detailInfos.mainPart?.[module]

const useDetail=defineStore('detail',{
    state:()=>{
        return{
            detailInfos:{}
        }
    },
    getters:{
        swipeData:(state)=>state.detailInfos.mainPart?.topModule.housePicture.housePics,
        topInfos:(state)=>state.detailInfos.mainPart?.topModule,
        houseFacility:(state)=>state.detailInfos.mainPart?.dynamicModule.facilityModule.houseFacility,
        landlord:(state)=>state.detailInfos.mainPart?.dynamicModule.landlordModule,
        comment:(state)=>state.detailInfos.mainPart?.dynamicModule.commentModule,
        orderRules:(state)=>state.detailInfos.mainPart?.dynamicModule.rulesModule.orderRules,
        position:(state)=>state.detailInfos.mainPart?.dynamicModule.positionModule,
        introduction:(state)=>state.detailInfos.mainPart?.introductionModule
    },
    actions:{
        async getDetailInfoDates(houseId){
            const {data} = await getDetailInfos(houseId)
            this.detailInfos=data
        }
    }
})
export default useDetail