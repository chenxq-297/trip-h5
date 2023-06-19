import { onActivated,onDeactivated,onMounted,onUnmounted, ref } from "vue";
import {debounce} from "underscore"

export default function useScroll(elRef){
    let el = window

    const isReachBottom=ref(false)
    // 滚动的内容(卷上去的)到顶部高度
    const scrollTop=ref('')
    const clientHeight = ref(0)
    const scrollHeight = ref(0)

    const scrollListenerHandler=debounce(()=>{
        if(el===window){
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value= document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
            // console.log(clientHeight,scrollTop,scrollHeight);
        }else{
            clientHeight.value = el.clientHeight
            scrollTop.value= el.scrollTop
            scrollHeight.value = el.scrollHeight
            // console.log(clientHeight,scrollTop,scrollHeight);
        }
        if(clientHeight.value+scrollTop.value+6 >= scrollHeight.value){
            console.log('到达底部');
            isReachBottom.value=true
        }
    },200)
    onMounted(()=>{
        // 被挂载 保证elref有值传进来
        if(elRef) el = elRef.value
        el.addEventListener('scroll',scrollListenerHandler)
    })

    onActivated(()=>{
        el.addEventListener('scroll',scrollListenerHandler)
    })

    onDeactivated(()=>{
        el.removeEventListener('scroll',scrollListenerHandler)
    })

    onUnmounted(()=>{
        el.removeEventListener('scroll',scrollListenerHandler)
    })

    return { isReachBottom,scrollTop }
}