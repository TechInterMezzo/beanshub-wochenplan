<template>
  <section id="app">
    <navigation/>
    <schedule/>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Navigation from "./components/Navigation.vue";
import Schedule from "./components/Schedule.vue";

export default Vue.extend({
  name: "app",
  created() {
    this.updateRealTime();
    this.updateViewWidth();

    setInterval(this.updateRealTime, 5 * 1000);

    window.addEventListener("resize", this.updateViewWidth, { passive: true });
    window.addEventListener("popstate", event => this.setCurrentDate(event.state), { passive: true });
    window.addEventListener("dragstart", event => event.preventDefault(), true);

    this.updateMeta();
    this.setCurrentDate(this.getDefaultDate());
  },
  computed: {
    ...mapGetters(["realDate", "dates", "activeSlot"])
  },
  watch: {
    realDate(value: number): void {
      this.setCurrentDate(value);
    },
    dates(value: number[]): void {
      this.updateDays(value);
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
    ...mapMutations(["updateRealTime", "setCurrentDate", "setMouse"]),
    ...mapActions(["updateViewWidth", "updateMeta", "updateDays"])
  },
  components: {
    Navigation,
    Schedule
  }
});
</script>

<style lang="scss">
@import "./common";
</style>
