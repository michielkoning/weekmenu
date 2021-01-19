<template>
  <li :class="{ active, active }" @click="$emit('selectItem')">
    <div class="box" :class="boxLargeColor">
      <template v-if="id">
        {{ id }}
      </template>

      <div v-if="listItemIcon" :class="{ icon: iconSmall }">
        <component :is="listItemIcon" />
      </div>
    </div>
    <div class="title">
      {{ title }}
    </div>
  </li>
</template>

<script>
import IconVegetarian from "@/components/Icons/IconVegetarian.vue";
import IconFish from "@/components/Icons/IconFish.vue";
import IconMeat from "@/components/Icons/IconMeat.vue";

export default {
  components: {
    IconVegetarian,
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

  computed: {
    listItemIcon() {
      switch (this.icon) {
        case "vegetarian":
          return IconVegetarian;
        case "meat":
          return IconMeat;
        case "fish":
          return IconFish;
        default:
          return null;
      }
    },
    boxLargeColor() {
      if (!this.iconSmall) {
        switch (this.icon) {
          case "vegetarian":
            return "green";
          case "meat":
            return "red";
          default:
            return "blue";
        }
      }
      return this.color;
    },
    boxSmallColor() {
      if (!this.iconSmall) {
        switch (this.icon) {
          case "vegetarian":
            return "green";
          case "meat":
            return "red";
          default:
            return "blue";
        }
      }
      return this.color;
    },
  },
};
</script>

<style lang="postcss" scoped>
.green {
  background: var(--color-green);
  color: var(--color-green-dark);
}

.red {
  background: var(--color-red);
  color: var(--color-red-dark);
}

.purple {
  background: var(--color-purple);
  color: var(--color-purple-dark);
}

.blue {
  background: var(--color-blue);
  color: var(--color-blue-dark);
}

li {
  display: grid;
  grid-template-columns: 4em auto;
  grid-gap: 0.5em;
  align-items: center;
  padding: 0.5em 0.5em;
  cursor: pointer;

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
  background: var(--color-green-dark);
  border-radius: 0.25em;
  color: var(--color);

  & svg {
    width: 0.5em;
    fill: var(--color-green);
    height: 0.5em;
  }
}

svg {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
}
</style>
