<template>
  <div class="slot" :class="elementClass" :style="elementStyle">
    <div>
      <span>{{ slot.timeStart | time }}</span>
      <span class="is-size-7">
        &nbsp;
        <fa :icon="['far', 'clock']" />
        {{ slot.duration | duration }}
        &nbsp;
      </span>
      <a :href="videoUrl" target="_blank" rel="noopener noreferrer" class="has-text-grey" v-if="slot.episodeId">
        <fa :icon="['fab', 'youtube']" />
      </a>
    </div>
    <div>
      <span class="has-text-grey-lighter">{{ slot.title }}</span>
      <span class="has-text-grey" v-if="slot.topic"> | {{ slot.topic }}</span>
    </div>
    <progress class="progress is-warning has-background-black" max="100" :value="progress"
      v-if="slot === activeSlot">
      {{ progress }}%
    </progress>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import dayjs from "dayjs";

var scrollTimeoutHandle = 0;

export default Vue.extend({
  name: "schedule-slot",
  props: ["value"],
  data() {
    return {
      top: 0,
      height: 0
    };
  },
  created() {
    if (this.isActive) {
      this.limitScroll();
    }
  },
  mounted() {
    this.updateBounds();
  },
  computed: {
    slot(): Slot {
      return this.value.slot;
    },
    slotGroup(): SlotGroup {
      return this.value.slotGroup;
    },
    day(): Day {
      return this.value.day;
    },
    isActive(): boolean {
      return this.activeSlot && this.activeDay && this.slot.id == this.activeSlot.id && this.day.date == this.activeDay.date;
    },
    elementClass(): string[] {
      let classes = ["is-" + this.slot.type];
      if (this.isActive) {
        classes.push("is-active");
      }
      return classes;
    },
    elementStyle(): object {
      return {
        flexGrow: this.weight
      };
    },
    weight(): number {
      let startTime = dayjs(this.slot.timeStart).valueOf();
      let endTime = dayjs(this.slot.timeEnd).valueOf();
      if (startTime < this.day.date) {
        startTime = this.day.date;
      }
      if (endTime >= this.day.nextDate) {
        endTime = this.day.nextDate;
      }
      return (endTime - startTime) / (this.slotGroup.duration * 1000);
    },
    videoUrl(): string {
      return 'https://rocketbeans.tv/mediathek/video/' + this.slot.episodeId;
    },
    progress(): number {
      if (this.activeSlot) {
        let start = dayjs(this.activeSlot.timeStart).valueOf();
        let end = dayjs(this.activeSlot.timeEnd).valueOf();
        return Math.floor(((this.realTime - start) / (end - start)) * 100);
      }
      return 0;
    },
    ...mapState(["realTime", "heights"]),
    ...mapGetters(["activeDay", "activeSlot"])
  },
  watch: {
    top() {
      if (this.isActive) {
        this.scroll();
      }
    },
    heights() {
      this.$nextTick(() => this.updateBounds());
    }
  },
  methods: {
    updateBounds(): void {
      let element = this.$el as HTMLElement;
      if (element) {
        let clientRect = element.getBoundingClientRect();
        this.top = Math.floor(clientRect.top + window.pageYOffset);
        this.height = Math.floor(clientRect.height);
      }
    },
    scroll(): void {
      if (scrollTimeoutHandle) {
        window.scrollTo(0, this.top - (window.innerHeight - this.height) / 2);
        this.limitScroll();
      }
    },
    limitScroll(): void {
      clearTimeout(scrollTimeoutHandle);
      scrollTimeoutHandle = setTimeout(() => scrollTimeoutHandle = 0, 1000);
    }
  }
});
</script>

<style lang="scss">
@import "../common";

.slot {
  position: relative;
  box-sizing: border-box;
  padding: 0.5em 0.75em;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  

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
  &.is-active {
    background-color: $black;
    color: $warning;
  }
  progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.3rem;
    border-radius: 0;
  }
}
</style>
