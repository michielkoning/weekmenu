<template>
  <center-wrapper>
    <div class="page">
      <div class="list">
        <h1>{{ title }}</h1>
        <slot />
      </div>
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <div v-if="showPanel" class="panel">
            <button class="btn-close" @click="$emit('close')">
              <icon-close />
            </button>

            <component :is="Component" :key="$route.fullPath" />
          </div>
        </transition>
      </router-view>
    </div>
  </center-wrapper>
</template>

<script lang="ts">
import IconClose from "@/components/Icons/IconClose.vue";
import CenterWrapper from "@/components/Layout/CenterWrapper.vue";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    IconClose,
    CenterWrapper,
  },
  props: {
    activePanel: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["close"],
  setup() {
    const route = useRoute();
    const showPanel = computed(
      () => route.params.id || route.name === "RecipeAdd"
    );
    return {
      route,
      showPanel,
    };
  },
});
</script>

<style lang="postcss" scoped>
.page {
  position: relative;
  padding-bottom: 2em;
  overflow-x: hidden;

  @media (--viewport-md) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

.list {
  padding-top: 1em;
}

.panel {
  padding: 1em;
  background: #efefef;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 5em;

  @media (--viewport-md) {
    left: auto;
    right: auto;
    position: relative;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all var(--animation);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100vw);

  @media (--viewport-md) {
    transform: translateY(2em);
  }
}

.btn-close {
  @mixin link-reset;

  z-index: 9;
  position: absolute;
  top: 1em;
  right: 1em;

  & svg {
    width: 1.5em;
    height: 1.5em;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
