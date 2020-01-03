<template>
  <div id="week" class="week" :class="weekClass" v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight">
    <div class="columns is-mobile is-marginless">
      <div class="column has-text-centered" v-for="day in days" :key="day.date">
        <div class="head">
          <div class="is-uppercase is-size-5 has-text-white has-text-weight-bold">{{ day.date | dayOfWeek }}</div>
          <a class="has-text-white" :href="day.date | date" @click.prevent="selectDate(day.date)">{{ day.date | date }}</a>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-marginless" v-for="index in slotGroupCount" :key="index">
      <div class="slots column is-flex" v-for="day in days" :key="day.date">
        <div class="slot" v-for="slot in day.slotGroups[index - 1]" :key="getSlotId(slot, day)"
          :id="getSlotId(slot, day)" :class="getSlotClass(slot)">
          <div>
            <span>{{ slot.timeStart | time }}</span>
            <span class="is-size-7">
              &nbsp;
              <fa :icon="['far', 'clock']"/>
              {{ slot.duration | duration }}
              &nbsp;
            </span>
            <a :href="'https://rocketbeans.tv/mediathek/video/' + slot.episodeId" target="_blank" rel="noopener noreferrer"
              class="has-text-grey" v-if="slot.episodeId">
              <fa :icon="['fab', 'youtube']"/>
            </a>
          </div>
          <div>
            <span class="has-text-grey-lighter">{{ slot.title }}</span>
            <span class="has-text-grey" v-if="slot.topic"> | {{ slot.topic }}</span>
          </div>
          <progress class="progress is-warning has-background-black is-radiusless" max="100"
            :value="slotProgress" v-if="slot === activeSlot">
            {{ slotProgress }}%
          </progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

export default Vue.extend({
  name: "week",
  data() {
    return {
      isDatePickerOpen: false
    };
  },
  computed: {
    weekClass(): string {
      return this.dayCount > 1 ? "multiple" : "single";
    },
    slotGroupCount(): number {
      return (this.days.length > 0 && this.days[0].slotGroups) ? this.days[0].slotGroups.length : 0;
    },
    slotProgress() : number {
      if (!this.activeSlot) {
        return 0;
      }
      let start = dayjs(this.activeSlot.timeStart).valueOf();
      let end = dayjs(this.activeSlot.timeEnd).valueOf();
      return Math.floor((this.realTime - start) / (end - start) * 100);
    },
    ...mapState(["realTime", "currentDate", "days", "hasMouse"]),
    ...mapGetters(["dayCount", "previousDate", "nextDate", "hasPreviousDate", "hasNextDate", "activeSlot"])
  },
  methods: {
    toggleDatePicker(): void {
      this.isDatePickerOpen = !this.isDatePickerOpen;
    },
    closeDatePicker(): void {
      if (this.isDatePickerOpen) {
        this.isDatePickerOpen = false;
      }
    },
    swipeLeft() : void {
      this.selectDate(this.nextDate);
    },
    swipeRight() : void {
      this.selectDate(this.previousDate);
    },
    getSlotId(slot: Slot, day: Day): string {
      return "slot-" + dayjs(day.date).format("YYYYMMDD") + "-" + slot.id;
    },
    getSlotClass(slot: Slot): string {
      return "is-" + slot.type + (slot === this.activeSlot ? " has-text-warning has-background-black" : "");
    },
    ...mapActions(["selectDate"])
  }
});
</script>

<style lang="scss">
@import "../common";
.week {
  height: calc(100vh - #{$navbar-height});
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;

  .column {
    padding: 0;

    &.is-flex {
      flex-direction: column;

      & > div {
        display: flex !important;
        flex: 1;
        flex-direction: column;
        justify-content: center;
      }
    }
    &:nth-child(odd) {
      background: $black-ter;

      & > div {
        border-top: 1px solid $grey-darker;
        border-bottom: 1px solid $black-bis;
      }
    }
    &:nth-child(even) {
      background: $grey-darker;

      & > div {
        border-top: 1px solid $grey-dark;
        border-bottom: 1px solid $black-ter;
      }
    }
  }
  .columns:first-child .column > div {
    border-top: 0;
  }
  .head {
    padding: 0.75em;
  }
  .slot {
    position: relative;
    padding: 0.5em 0.75em;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 0.3rem;
    }
    &.is-live::before {
      background-color: $danger;
    }
    &.is-premiere::before {
      background-color: $info;
    }
    progress {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0.3rem;
    }
  }
  &.multiple .columns:nth-child(even) .slot:first-child {
    background-color: rgba($black, 0.4);
  }
}
</style>
