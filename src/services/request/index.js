import axios from "axios";
import { BASE_URL,TIMEOUT } from "./config";

// loading逻辑
import { useIndex } from "@/stores";

class Request{
    constructor(baseURL, timeout=10000) {
        // 报错的原因是axios.create中属性名为baseURL 想要简写就不能为所欲为的写
        this.instance = axios.create({
          baseURL,
          timeout
        })
        this.instance.interceptors.request.use((config)=>{
            useIndex().isLoading=true
            return config
        },err=>{
            useIndex().isLoading=true
            return err
        })
        this.instance.interceptors.response.use(res=>{
            useIndex().isLoading=false
            return res
        },err=>{
            useIndex().isLoading=false
            return err
        })
    }
    request(config){
        return new Promise((resolve,reject)=>{
            this.instance.request(config).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    
    get(config){
        return this.request({...config,method:"get"})
    }

    post(config){
        return this.request({...config,method:"post"})
    }
}

export default new Request(BASE_URL,TIMEOUT)

