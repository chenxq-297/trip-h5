import axios from "axios";
import { BASE_URL,TIMEOUT } from "./config";

class Request{
    constructor(baseURL, timeout=10000) {
        // 报错的原因是axios.create中属性名为baseURL 想要简写就不能为所欲为的写
        this.instance = axios.create({
          baseURL,
          timeout
        })
        // this.instance.interceptors.request.use(config=>{
        //     return config
        // },err=>{
        //     return err
        // })
        // this.instance.interceptors.response.use(res=>{
        //     return res
        // },err=>{
        //     return err
        // })
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

