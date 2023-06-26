import { defineStore } from "pinia";

import { getFavorList, getHistoryList } from "@/services/modules/favor";

export const useFavorStore = defineStore("favor", {
  state: () => {
    return {
      favorlist: [],
      historylist: [],
    };
  },
  getters: {},
  actions: {
    async getHistoryListFn() {
      const { data } = await getFavorList();
      this.favorlist = data.data.items;
      return this.favorlist;
    },
    async getFavorListFn() {
      const { data } = await getHistoryList();
      this.historylist = data.data.items;
      return this.historylist;
    },
  },
});
