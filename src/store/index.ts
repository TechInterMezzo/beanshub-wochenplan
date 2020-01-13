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
    days: new Array<Day>(),
    heights: new Array<number>(3).fill(0),
    isCompressed: false
  },
  getters: {
    dayCount(state): number {
      return Math.min(Math.floor(state.viewWidth / 240), 7);
    },
    hasMultipleDays(_state, getters): boolean {
      return getters.dayCount > 1;
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
    nextDate(_state, getters): number {
      return dayjs(getters.startDate).add(getters.dayCount, 'day').valueOf();
    },
    hasPreviousDate(state, getters): boolean {
      return state.firstDate > 0 && getters.nextDate >= state.firstDate;
    },
    hasNextDate(state, getters): boolean {
      return state.lastDate > 0 && getters.nextDate <= state.lastDate;
    },
    dates(state, getters): number[] {
      let dates = [];
      let start = dayjs(getters.startDate);
      for (let i = 0; i < getters.dayCount; i++) {
        let date = start.add(i, 'day').valueOf();
        if (date >= state.firstDate && date <= state.lastDate) {
          dates.push(date);
        }
      }
      return dates;
    },
    activeDay(state): Day | null {
      for (let day of state.days) {
        if (day.date <= state.realTime && day.nextDate > state.realTime) {
          return day;
        }
      }
      return null;
    },
    activeSlotGroup(state, getters): SlotGroup | null {
      if (getters.activeDay) {
        for (let slotGroup of getters.activeDay.slotGroups) {
          if (slotGroup.time <= state.realTime && slotGroup.nextTime > state.realTime) {
            return slotGroup;
          }
        }
      }
      return null;
    },
    activeSlot(state, getters): Slot | null {
      if (getters.activeSlotGroup) {
        for (let slot of getters.activeSlotGroup.slots) {
          if (dayjs(slot.timeStart).valueOf() <= state.realTime && dayjs(slot.timeEnd).valueOf() > state.realTime) {
            return slot;
          }
        }
      }
      return null;
    }
  },
  mutations: {
    updateRealTime(state) {
      state.realTime = Date.now();
    },
    setViewWidth(state, width: number) {
      state.viewWidth = width;
    },
    setCurrentDate(state, date: number) {
      state.currentDate = date;
    },
    setMetaDates(state, meta: Meta) {
      state.firstDate = dayjs(meta.firstDate).valueOf();
      state.lastDate = dayjs(meta.lastDate).valueOf();
    },
    setDays(state, days: Day[]) {
      state.days = days;
    },
    setHeight(state, { index, value }) {
      state.heights.splice(index, 1, value);
    },
    setCompressed(state, value: boolean) {
      state.isCompressed = value;
    }
  },
  actions: {
    updateViewWidth({ commit }): void {
      commit('setViewWidth', window.innerWidth);
    },
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
    updateDays({ commit, dispatch, state, getters }): void {
      let dates: number[] = getters.dates;
      let pathes = dates.map(date => 'slots/' + dayjs(date).format('YYYY/MM/DD') + '.json');
      let days = sessionCache.getValues<Slot[]>(pathes, () => dispatch('updateDays', dates)).map((slots, index) => {
        if (!slots) {
          return [];
        }
        let date = dates[index];
        let nextDate = dayjs(date).add(1, 'day').valueOf();
        let breakpoints = [dayjs(date).hour(10).minute(30), dayjs(date).hour(20)];
        let intervals = breakpoints.map(breakpoint => [breakpoint.valueOf(), breakpoint.add(1, 'hour').valueOf()]);
        let day: Day = {
          date: date,
          nextDate: dayjs(date).add(1, 'day').valueOf(),
          slotGroups: [{
            time: date,
            nextTime: nextDate,
            duration: 0,
            firstIndex: 0,
            lastIndex: intervals.length,
            slots: []
          }]
        };
        let intervalIndex = 0;
        let groupIndex = 0;
        let lastRerunSlot: Slot | null = null;
        for (let slot of slots) {
          let time = dayjs(slot.timeStart).valueOf();
          if (state.isCompressed) {
            if (slot.type == 'rerun') {
              if (lastRerunSlot) {
                lastRerunSlot.timeEnd = slot.timeEnd;
                lastRerunSlot.duration += slot.duration;
                day.slotGroups[groupIndex].duration += slot.duration;
                continue;
              } else {
                lastRerunSlot = {
                  id: slot.id,
                  title: "Wiederholungen",
                  topic: "",
                  game: "",
                  showId: 0,
                  episodeId: 0,
                  bohnen: [],
                  timeStart: slot.timeStart,
                  timeEnd: slot.timeEnd,
                  duration: slot.duration,
                  durationClass: 0,
                  streamExclusive: false,
                  type: 'rerun'
                };
                slot = lastRerunSlot;
              }
            } else {
              lastRerunSlot = null;
            }
          }
          while (intervals[intervalIndex] && time >= intervals[intervalIndex][0]) {
            if (time <= intervals[intervalIndex][1]) {
              day.slotGroups[groupIndex].nextTime = intervals[intervalIndex][0];
              day.slotGroups[groupIndex].lastIndex = intervalIndex;
              day.slotGroups.push({
                time: intervals[intervalIndex][0],
                nextTime: nextDate,
                duration: 0,
                firstIndex: intervalIndex + 1,
                lastIndex: intervals.length,
                slots: []
              });
              intervalIndex++;
              groupIndex++;
            } else {
              day.slotGroups[groupIndex].lastIndex = intervalIndex + 1;
              intervalIndex++;
            }
          }
          let slotGroup = day.slotGroups[groupIndex];
          slotGroup.duration += slot.duration;
          slotGroup.slots.push(slot);
        }
        return day;
      });
      commit('setDays', days);
    }
  }
});
