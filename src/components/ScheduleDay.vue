<template>
  <div class="day column">
    <div class="head" :style="headStyle">
      <div class="is-uppercase is-size-5 has-text-white has-text-weight-bold">{{ day.date | dayOfWeek }}</div>
      <a :href="day.date | date" @click.prevent="selectDate(day.date)">{{ day.date | date }}</a>
    </div>
    <div style="position: fixed; height: 20px; background: #000"></div>
    <div class="slots">
      <schedule-slot-group v-for="slotGroup in day.slotGroups" :key="slotGroup.time"
        :value="{ slotGroup: slotGroup, day: day }"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import ScheduleSlotGroup from "./ScheduleSlotGroup.vue";

export default Vue.extend({
  name: "schedule-day",
  props: ["day"],
  data() {
    return {
      width: 0
    };
  },
  mounted() {
    this.updateWidth();
  },
  computed: {
    headStyle(): object {
      return {
        width: this.width + 'px'
      };
    },
    ...mapState(['viewWidth'])
  },
  watch: {
    viewWidth() {
      this.updateWidth();
    }
  },
  methods: {
    updateWidth(): void {
      let element = this.$el as HTMLElement;
      if (element) {
        this.width = element.offsetWidth;
      }
    },
    ...mapActions(["selectDate"])
  },
  components: {
    ScheduleSlotGroup
  }
});
</script>

<style lang="scss">
@import "../common";

.day {
  padding: 0 !important;

  &:nth-child(odd) {
    background: $black-ter;

    .head {
      background: $black-ter;
      border-bottom: 2px solid $black-bis;
    }
    .slot {
      border-top: 1px solid $grey-darker;
      border-bottom: 1px solid $black-bis;
    }
  }
  &:nth-child(even) {
    background: $grey-darker;

    .head {
      background: $grey-darker;
      border-bottom: 2px solid $black-ter;
    }
    .slot {
      border-top: 1px solid $grey-dark;
      border-bottom: 1px solid $black-ter;
    }
  }
  
  .head {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    height: 4.25rem;
    text-align: center;
    z-index: 10;

    &:after {
      content: "";
      position: absolute;
      display: block;
      top: 4.25rem;
      width: 100%;
      height: 12px;
      background-image: linear-gradient(to bottom, rgba($black, 0.33), rgba($black, 0));
    }
  }
  .slots {
    display: flex;
    flex-direction: column;
    margin-top: 4.25rem;
  }
}
</style>
