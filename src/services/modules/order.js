import request from "../request";
/**
 * @param {*} type all 全部订单
 * @param {*} type recent 最近订单
 * @param {*} type pend 未完成订单
 * @returns OrderList
 */
export function getOrderList(type = "all") {
  return request.get({
    url: `/order/list?type=${type}`,
  });
}
