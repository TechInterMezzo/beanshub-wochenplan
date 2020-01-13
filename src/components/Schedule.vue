<template>
  <div id="schedule" class="schedule" :class="elementClass" v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight">
    <div class="columns is-mobile is-marginless">
      <schedule-day v-for="day in days" :key="day.date" :day="day"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";
import ScheduleDay from "./ScheduleDay.vue";

export default Vue.extend({
  name: "schedule",
  computed: {
    elementClass(): string {
      return this.hasMultipleDays ? "has-multiple" : "has-single";
    },
    ...mapState(["days"]),
    ...mapGetters(["hasMultipleDays", "previousDate", "nextDate"])
  },
  methods: {
    swipeLeft(): void {
      this.selectDate(this.nextDate);
    },
    swipeRight(): void {
      this.selectDate(this.previousDate);
    },
    ...mapActions(["selectDate"])
  },
  components: {
    ScheduleDay
  }
});
</script>

<style lang="scss">
@import "../common";
</style>
