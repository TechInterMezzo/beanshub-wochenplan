<template>
  <section id="app">
    <navigation/>
    <week/>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import dayjs from "dayjs";
import Navigation from "./components/Navigation.vue";
import Week from "./components/Week.vue";

export default Vue.extend({
  name: "app",
  created() {
    this.updateRealTime();
    this.updateViewWidth();

    setInterval(this.updateRealTime, 5 * 1000);

    window.addEventListener("resize", this.updateViewWidth);
    window.addEventListener("popstate", event => this.setCurrentDate(event.state));
    window.addEventListener("dragstart", event => event.preventDefault(), true);

    this.updateMeta();
    this.setCurrentDate(this.getDefaultDate());
  },
  computed: {
    activeSlotId(): string {
      if (this.activeSlot) {
        return "slot-" + dayjs(this.realDate).format("YYYYMMDD") + "-" + this.activeSlot.id;
      }
      return "";
    },
    ...mapGetters(["realDate", "dates", "activeSlot"])
  },
  watch: {
    realDate(value: number): void {
      this.setCurrentDate(value);
    },
    dates(value: number[]): void {
      this.updateDays(value);
    },
    activeSlotId(value: string): void {
      if (value) {
        this.$nextTick(() => this.scrollToSlot(value));
      }
    }
  },
  methods: {
    getDefaultDate(): number {
      let url = location.href;
      let baseUrl = document.getElementsByTagName("base")[0].href;
      if (url.startsWith(baseUrl)) {
        let path = url.substring(baseUrl.length);
        let match = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/i.exec(path);
        if (match) {
          return new Date(parseInt(match[3]),parseInt(match[2]) - 1, parseInt(match[1])).valueOf();
        }
      }
      return this.realDate;
    },
    scrollToSlot(slotId: string): void {
      let navigation = document.getElementById("navigation");
      let slot = document.getElementById(slotId);
      if (navigation && slot) {
        this.$scrollTo(slot, {
          offset: -navigation.clientHeight
        });
        //element.scrollIntoView();
      }
    },
    ...mapMutations(["updateRealTime", "updateViewWidth", "setCurrentDate", "setMouse"]),
    ...mapActions(["updateMeta", "updateDays"])
  },
  components: {
    Navigation,
    Week
  }
});
</script>

<style lang="scss">
@import "./common";
</style>
