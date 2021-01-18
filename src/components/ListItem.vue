<template>
  <li :style="colors" :class="{ active, active }" @click="$emit('selectItem')">
    <div class="box">
      <template v-if="id">
        {{ id }}
      </template>
      <div :class="{ icon: iconSmall }">
        <component :is="listItemIcon" v-if="listItemIcon" />
      </div>
    </div>
    <div class="title">
      {{ title }}
    </div>
  </li>
</template>

<script>
import { computed } from "vue";
import IconVegeterian from "@/components/Icons/IconVegeterian.vue";

export default {
  components: {
    IconVegeterian,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "green",
    },
    icon: {
      type: String,
      default: null,
    },
    iconSmall: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["selectItem"],
  setup(props) {
    const colors = computed(() => {
      let color = "";
      switch (props.icon) {
        case "meat":
          color = "red";
          break;

        case "fish":
          color = "blue";
          break;

        default:
          color = "green";
          break;
      }
      return {
        "--color": `var(--color-${color})`,
        "--color-dark": `var(--color-${color}-dark)`,
      };
    });

    return { colors };
  },
  computed: {
    listItemIcon() {
      if (this.icon === "vegetarian") {
        return IconVegeterian;
      }
      return null;
    },
  },
};
</script>

<style lang="postcss" scoped>
li {
  display: grid;
  grid-template-columns: 4em auto;
  grid-gap: 0.5em;
  align-items: center;
  padding: 0.5em 0.5em;

  &.active {
    background: #efefef;
  }

  &:hover .title {
    text-decoration: underline;
  }
}

button {
  text-align: left;
}

.box {
  position: relative;
  border-radius: 0.25rem;
  display: block;
  height: 4rem;
  width: 4rem;
  background: var(--color);
  color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.icon {
  position: absolute;
  left: -0.25em;
  top: -0.25em;
  height: 1em;
  width: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-dark);
  border-radius: 0.25em;
  color: var(--color);

  & svg {
    width: 0.5em;
    height: 0.5em;
  }
}

svg {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
}
</style>
