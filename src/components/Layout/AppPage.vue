<template>
  <div class="page">
    <div>
      <h1>{{ title }}</h1>
      <slot />
    </div>
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <div v-if="router.params.id" class="panel">
          <button class="btn-close" @click="$emit('close')">
            <icon-close />
          </button>

          <component :is="Component" :key="$route.fullPath" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script>
import IconClose from "@/components/Icons/IconClose.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    IconClose,
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
    const router = useRoute();

    return {
      router,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page {
  position: relative;
  padding-bottom: 2em;
  overflow-x: hidden;

  @media (--viewport-md) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-left: 1em;
    padding-right: 1em;
  }
}

.panel {
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
  transition: all 0.2s ease;
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
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
