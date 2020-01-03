<template>
  <div id="date-picker" class="date-picker">
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-compact is-text" @click="setToPreviousMonth" v-show="hasPreviousMonth">
          <fa :icon="['fas', 'angle-left']" size="lg"/>
        </button>
      </div>
      <div class="control">
        <div class="select">
          <select v-model="month">
            <option v-for="value in months" :key="value" :value="value">{{ value | month }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <div class="select">
          <select v-model="year">
            <option v-for="value in years" :key="value" :value="value">{{ value }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button class="button is-compact is-text" @click="setToNextMonth" v-show="hasNextMonth">
          <fa :icon="['fas', 'angle-right']" size="lg"/>
        </button>
      </div>
    </div>
    <div class="calendar field is-grouped is-grouped-multiline" @click="selectDay">
      <span class="button is-compact is-static">Mo</span>
      <span class="button is-compact is-static">Di</span>
      <span class="button is-compact is-static">Mi</span>
      <span class="button is-compact is-static">Do</span>
      <span class="button is-compact is-static">Fr</span>
      <span class="button is-compact is-static">Sa</span>
      <span class="button is-compact is-static">So</span>
      <a class="button is-compact" v-for="(value, index) in days" :key="index" :class="dayClass(value, day)" :data-day="value">
        {{ value | day }}
      </a>
    </div>
    <div class="field"></div>
    <div class="field">
      <div class="control">
        <button class="button is-fullwidth" @click="confirmSelection" :disabled="!isValid">Auswahl bestätigen</button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-text is-fullwidth" @click="selectToday">Heute auswählen</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/de';

export default Vue.extend({
  name: 'date-picker',
  data() {
    return {
      year: 0,
      month: 0,
      day: 0
    };
  },
  created() {
    this.reset();
  },
  computed: {
    years(): number[] {
      let years = [];
      let firstYear = dayjs(this.firstDate).year();
      let lastYear = dayjs(this.lastDate).year();
      for (let year = lastYear; year >= firstYear; year--) {
        years.push(year);
      }
      return years;
    },
    months(): number[] {
      if (!this.year) {
        return [];
      }
      let months = [];
      for (let month = 1; month <= 12; month++) {
        let date = new Date(this.year, month - 1, 1).valueOf();
        if (date >= this.firstDate && date <= this.lastDate) {
          months.push(month);
        }
      }
      return months;
    },
    days(): number[] {
      if (!this.month) {
        return [];
      }
      let days = [];
      let firstDate = new Date(this.year, this.month - 1, 1).valueOf();
      let lastDay = dayjs(firstDate).daysInMonth();
      let preCount = (dayjs(firstDate).day() || 7) - 1;
      for (let i = 0; i < preCount; i++) {
        days.push(0);
      }
      for (let day = 1; day <= lastDay; day++) {
        let date = new Date(this.year, this.month - 1, day).valueOf();
        if (date >= this.firstDate && date <= this.lastDate) {
          days.push(day);
        }
      }
      let postCount = 7 - (days.length % 7);
      for (let i = 0; i < postCount; i++) {
        days.push(0);
      }
      return days;
    },
    date(): number {
      return new Date(this.year, this.month - 1, this.day).valueOf();
    },
    isValid(): boolean {
      return dayjs(this.date).isValid() && this.date >= this.firstDate && this.date <= this.lastDate;
    },
    hasNextMonth(): boolean {
      return this.lastDate >= dayjs(this.date).add(1, 'month').startOf('month').valueOf()
    },
    hasPreviousMonth(): boolean {
      return this.firstDate <= dayjs(this.date).subtract(1, 'month').startOf('month').valueOf();
    },
    ...mapState(['firstDate', 'lastDate', 'currentDate'])
  },
  watch: {
    currentDate() {
      this.reset();
    }
  },
  methods: {
    reset() {
      this.setDate(this.currentDate);
    },
    setDate(value: number): void {
      let date = dayjs(value);
      this.year = date.year();
      this.month = date.month() + 1;
      this.day = date.date();
    },
    setToNextMonth(): void {
      this.setDate(dayjs(this.date).add(1, 'month').valueOf());
    },
    setToPreviousMonth(): void {
      this.setDate(dayjs(this.date).subtract(1, 'month').valueOf());
    },
    dayClass(value: number, selectedValue: number): string {
      if (!value) {
        return 'is-static';
      } else if (value == selectedValue) {
        return 'is-active';
      }
      return '';
    },
    selectDay(event: MouseEvent): void {
      let element = event.target as HTMLElement;
      if (element && element.dataset.day) {
        this.day = parseInt(element.dataset.day);
      }
    },
    confirmSelection(): void {
      this.selectDate(this.date);
      this.close();
    },
    selectToday(): void {
      this.selectDate();
      this.close();
    },
    close(): void {
      this.$emit('close');
    },
    ...mapActions(['selectDate'])
  },
  filters: {
    month(value: number): string {
      return locale.months ? locale.months[value - 1] : '';
    },
    day(value: number): string {
      return value ? value.toString().padStart(2, '0') : '';
    }
  }
});
</script>
<style lang="scss">
@import "../common";

.date-picker {
  .button.is-small {
    display: inline-block;
    margin-right: 1px;
    margin-bottom: 1px;
    width: 3rem;
    font-size: $size-7;
  }
  .button.is-compact {
    padding: 0.6em;
  }
  .calendar {
    margin: 0 auto;
    width: 20rem;

    &.field.is-grouped {
      justify-content: center;
    }
    .button {
      border-radius: 0;
      margin-right: 1px;
      margin-bottom: 1px;
      width: 2.75em;

      &:first-child {
        border-top-left-radius: 4px;
      }
      &:nth-child(7) {
        border-top-right-radius: 4px;
      }
      &:nth-last-child(7) {
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>
