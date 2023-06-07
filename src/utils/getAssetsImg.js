export const getAssetURL=(image)=>{
    // URL parma1 相对路径  parma2 当前路径
    return new URL(`../assets/img/${image}`,import.meta.url).href
}