import { onActivated,onDeactivated,onMounted,onUnmounted, ref } from "vue";
import {debounce} from "underscore"

export default function useScroll(){
    const isReachBottom=ref(false)
    // 滚动的内容(卷上去的)到顶部高度
    const scrollTop=ref('')

    const scrollListenerHandler=debounce(()=>{
        const clientHeight = document.documentElement.clientHeight
        scrollTop.value= document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        // console.log(clientHeight,scrollTop,scrollHeight);
        if(clientHeight+scrollTop.value+6 >= scrollHeight){
            // console.log('到达底部');
            isReachBottom.value=true
        }
    },200)
    onMounted(()=>{
        window.addEventListener('scroll',scrollListenerHandler)
    })

    onActivated(()=>{
        window.addEventListener('scroll',scrollListenerHandler)
    })

    onDeactivated(()=>{
        window.removeEventListener('scroll',scrollListenerHandler)
    })

    onUnmounted(()=>{
        window.removeEventListener('scroll',scrollListenerHandler)
    })

    return { isReachBottom,scrollTop }
}