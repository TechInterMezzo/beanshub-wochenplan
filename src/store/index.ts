import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';
import { sessionCache } from '../web-cache';

Vue.use(Vuex);

var metaUpdateHandle = 0;

export default new Vuex.Store({
  state: {
    realTime: 0,
    viewWidth: 0,
    firstDate: 0,
    lastDate: 0,
    currentDate: 0,
    days: <Day[]>[]
  },
  getters: {
    dayCount(state): number {
      return Math.min(Math.floor(state.viewWidth / 260), 7);
    },
    realDate(state): number {
      return dayjs(state.realTime).startOf('day').valueOf();
    },
    startDate(state, getters): number {
      let count = 8 - (dayjs(state.currentDate).day() || 7);
      if (count >= getters.dayCount) {
        return state.currentDate;
      }
      return dayjs(state.currentDate).subtract(getters.dayCount - count, 'day').valueOf();
    },
    previousDate(_state, getters): number {
      return dayjs(getters.startDate).subtract(getters.dayCount, 'day').valueOf();
    },
    nextDate(_state, getter): number {
      return dayjs(getter.startDate).add(getter.dayCount, 'day').valueOf();
    },
    hasPreviousDate(state, getter): boolean {
      return state.firstDate > 0 && getter.nextDate >= state.firstDate;
    },
    hasNextDate(state, getter): boolean {
      return state.lastDate > 0 && getter.nextDate <= state.lastDate;
    },
    dates(state, getter): number[] {
      let dates = [];
      let start = dayjs(getter.startDate);
      for (let i = 0; i < getter.dayCount; i++) {
        let date = start.add(i, 'day').valueOf();
        if (date >= state.firstDate && date <= state.lastDate) {
          dates.push(date);
        }
      }
      return dates;
    },
    activeSlot(state): Slot | null {
      let now = state.realTime;
      for (let day of state.days) {
        if (day.date <= now && day.nextDate > now) {
          for (let slotGroup of day.slotGroups) {
            for (let slot of slotGroup) {
              if (dayjs(slot.timeStart).valueOf() <= now && dayjs(slot.timeEnd).valueOf() > now) {
                return slot;
              }
            }
          }
        }
      }
      return null;
    }
  },
  mutations: {
    updateRealTime(state): void {
      state.realTime = Date.now();
    },
    updateViewWidth(state): void {
      state.viewWidth = window.innerWidth;
    },
    setCurrentDate(state, date: number): void {
      state.currentDate = date;
    },
    setMetaDates(state, meta: Meta): void {
      state.firstDate = dayjs(meta.firstDate).valueOf();
      state.lastDate = dayjs(meta.lastDate).valueOf();
    },
    setDays(state, days: Day[]): void {
      state.days = days;
    }
  },
  actions: {
    selectDate({ commit, state, getters }, date?: number): void {
      let path = date ? dayjs(date).format('DD.MM.YYYY') : './';
      date = date || <number>getters.realDate;
      if (date >= state.firstDate && date <= state.lastDate) {
        history.pushState(date, document.title, path);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        commit('setCurrentDate', date);
      }
    },
    updateMeta({ commit, dispatch, getters }): void {
      clearTimeout(metaUpdateHandle);
      let meta = sessionCache.getValue<Meta>('meta.json', () => dispatch('updateMeta'));
      if (meta) {
        commit('setMetaDates', meta);
        dispatch('updateDays', getters.dates);
      }
      metaUpdateHandle = setTimeout(() => dispatch('updateMeta'), 60 * 1000);
    },
    updateDays({ commit, dispatch, state }, dates: number[]): void {
      let pathes = dates.map(date => 'slots/' + dayjs(date).format('YYYY/MM/DD') + '.json');
      let days = sessionCache.getValues<Slot[]>(pathes, () => dispatch('updateDays', dates)).map((slots, index) => {
        if (!slots) {
          return [];
        }
        let date = dates[index];
        let slotGroups: Slot[][] = new Array(6);
        for (let i = 0; i < slotGroups.length; i++) {
          slotGroups[i] = [];
        }
        let start = dayjs(date);
        let intervals = [start.hour(10).minute(30), start.hour(20), start.add(1, 'day')];
        let intervalIndex = 0;
        for (let slot of slots) {
          let time = dayjs(slot.timeStart);
          while (!time.isBefore(intervals[intervalIndex])) {
            intervalIndex++;
          }
          let index = intervalIndex * 2;
          if (slotGroups[index].length == 0) {
            slotGroups[index].push(slot);
          } else {
            slotGroups[index + 1].push(slot);
          }
        }
        return <Day>{
          date: dates[index],
          nextDate: dayjs(dates[index]).add(1, 'day').valueOf(),
          slotGroups: slotGroups
        };
      });
      commit('setDays', days);
    }
  }
});
