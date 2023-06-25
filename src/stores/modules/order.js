import { defineStore } from "pinia";

import { getOrderList } from "@/services/modules/order";
export const useOrderStore = defineStore("order", {
  state: () => {
    return {
      orderlist: [],
    };
  },
  getters: {},
  actions: {
    async getOrderListFn(type) {
      const { data } = await getOrderList(type);
      this.orderlist = data.data.orders;
      return this.orderlist;
    },
  },
});
