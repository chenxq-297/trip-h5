import { defineStore } from 'pinia'

import { getHomeHotSuggests,getHomeCategories,getHomeHouselist } from '@/services/modules/home'

export const useHomeStore=defineStore('home',{
    state: () => {
        return {
          // 所有这些属性都将自动推断其类型
          hotSuggests:[],
          categories:[],

          currentPage:1,
          houseList:[],

          DateInterval:{
            startDate:new Date().getTime(),
            endDate:new Date().getTime() + (24 * 60 * 60 * 1000)
          }
        }
      },
      actions:{
        async fatchHotSuggestDate(){
          const {data} = await getHomeHotSuggests()
          this.hotSuggests=data
        },
        async fatchCategories(){
          const {data} = await getHomeCategories()
          this.categories=data
        },
        async fetchHouselistData() {
          const {data} = await getHomeHouselist(this.currentPage)
          this.houseList.push(...data)
          this.currentPage++
        }
      },
      getters:{

      }
})

export default useHomeStore