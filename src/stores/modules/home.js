import { defineStore } from 'pinia'

export const useHomeStore=defineStore('home',{
    state: () => {
        return {
          // 所有这些属性都将自动推断其类型
          counter: 0,
          name: 'Eduardo',
          isAdmin: true,
        }
      },
})

export default useHomeStore