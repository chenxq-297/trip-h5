import { createPinia,defineStore } from 'pinia'
const pinia=createPinia()

export default pinia

export const useIndex=defineStore('Index',{
    state: () => {
        return {
            isLoading:false
        }
      },
      actions:{
       
      },
      getters:{

      }
})