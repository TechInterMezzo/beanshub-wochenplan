<template>
  <div class="slot-group" :style="elementStyle">
    <schedule-slot v-for="slot in slotGroup.slots" :key="day.date + '-' + slot.id"
      :value="{ slot: slot, slotGroup: slotGroup, day: day }"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import ScheduleSlot from "./ScheduleSlot.vue";

export default Vue.extend({
  name: "schedule-slot-group",
  props: ["value"],
  mounted() {
    this.resetHeight();
  },
  computed: {
    slotGroup(): SlotGroup {
      return this.value.slotGroup;
    },
    day(): Day {
      return this.value.day;
    },
    minHeight(): number {
      let height = 0;
      if (this.hasMultipleDays) {
        for (let i = this.slotGroup.firstIndex; i <= this.slotGroup.lastIndex; i++) {
          height += this.heights[i];
        }
      }
      return height;
    },
    elementStyle(): object {
      return {
        minHeight: this.minHeight + "px"
      };
    },
    ...mapState(["viewWidth", "heights"]),
    ...mapGetters(["hasMultipleDays"])
  },
  watch: {
    viewWidth() {
      this.resetHeight();
    },
    slotGroup() {
      this.resetHeight();
    }
  },
  methods: {
    resetHeight(): void {
      if (this.hasMultipleDays) {
        for (let i = this.slotGroup.firstIndex; i <= this.slotGroup.lastIndex; i++) {
          if (this.heights[i] > 0) {
            this.setHeight({ index: i, value: 0 });
          }
        }
        this.$nextTick(this.updateHeight);
      }
    },
    updateHeight(): void {
      let element = this.$el as HTMLElement;
      if (this.hasMultipleDays && element) {
        let height = element.offsetHeight;
        if (height > this.minHeight) {
          for (let i = this.slotGroup.firstIndex; i < this.slotGroup.lastIndex; i++) {
            height -= this.heights[i];
          }
          this.setHeight({ index: this.slotGroup.lastIndex, value: height });
        }
      }
    },
    ...mapMutations(["setHeight"])
  },
  components: {
    ScheduleSlot
  }
});
</script>

<style lang="scss">
@import "../common";

.slot-group {
  display: flex;
  flex-direction: column;

  .slot:last-child {
    border-bottom-width: 2px !important;
  }
}
</style>
