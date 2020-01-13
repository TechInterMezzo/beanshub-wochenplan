<template>
  <nav id="navigation" class="navbar navbar is-fixed-top">
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item is-square" :href="previousDate | date" @click.prevent="selectDate(previousDate)" v-show="hasPreviousDate">
          <fa :icon="['fas', 'angle-left']" size="2x"/>
        </a>
        <div class="navbar-item has-dropdown" :class="datePickerMenuClass" v-click-outside="closeDatePicker">
          <a class="navbar-link" @click="toggleDatePicker">{{ currentDate | year }} KW {{ currentDate | week }}</a>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <date-picker :is-open="isDatePickerOpen" @close="closeDatePicker"/>
            </div>
          </div>
        </div>
        <a class="navbar-item" href="/">BeansHub</a>
      </div>
      <div class="navbar-end">
        <a class="navbar-item is-right">
          <fa :icon="['fas', isCompressed ? 'compress' : 'expand']" size="2x" @click="toggleCompressed"/>
        </a>
        <a class="navbar-item is-square is-right" :href="nextDate | date" @click.prevent="selectDate(nextDate)" v-show="hasNextDate">
          <fa :icon="['fas', 'angle-right']" size="2x"/>
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import DatePicker from "./DatePicker.vue";

export default Vue.extend({
  name: "navigation",
  data() {
    return {
      isDatePickerOpen: false
    };
  },
  computed: {
    datePickerMenuClass(): string {
      return this.isDatePickerOpen ? "is-active" : "";
    },
    ...mapState(["currentDate", "isCompressed"]),
    ...mapGetters(["previousDate", "nextDate", "hasPreviousDate", "hasNextDate"])
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
    toggleCompressed(): void {
      this.setCompressed(!this.isCompressed);
    },
    ...mapMutations(["setCompressed"]),
    ...mapActions(["selectDate"])
  },
  components: {
    DatePicker
  }
});
</script>

<style lang="scss">
@import "../common";

.navbar-item.is-square {
  width: $navbar-height;
  justify-content: center;
}
</style>
