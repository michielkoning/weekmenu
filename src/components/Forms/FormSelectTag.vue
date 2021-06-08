<template>
  <fieldset class="wrapper">
    <legend class="legend">Categorie</legend>
    <template v-for="tag in tags" :key="`label-${tag}`">
      <input
        :id="`tag-${tag}`"
        type="radio"
        :value="tag"
        :checked="modelValue === tag"
        name="tag"
        class="input"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <label :for="`tag-${tag}`" class="label" :class="tag">
        <component :is="`icon-${tag}`" />
      </label>
    </template>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IconVegetarian from "@/components/Icons/IconVegetarian.vue";
import IconFish from "@/components/Icons/IconFish.vue";
import IconMeat from "@/components/Icons/IconMeat.vue";
import { ref } from "vue";

export default defineComponent({
  components: {
    IconVegetarian,
    IconFish,
    IconMeat,
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    const tags = ref(["vegetarian", "meat", "fish"]);
    return {
      tags,
    };
  },
});
</script>

<style lang="postcss" scoped>
.wrapper {
  border: 0;
  padding: 0;
  display: flex;
}

.legend {
  font-weight: 700;
}

.vegetarian {
  border-color: var(--color-green);
  color: var(--color-green-dark);

  &:hover,
  &:focus {
    border-color: var(--color-green-dark);
  }
}

.meat {
  border-color: var(--color-red);
  color: var(--color-red-dark);

  &:hover {
    border-color: var(--color-red-dark);
  }
}

.fish {
  border-color: var(--color-blue);
  color: var(--color-blue-dark);

  &:hover {
    border-color: var(--color-blue-dark);
  }
}

.label,
.item {
  @mixin link-reset;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  border-width: 2px;
  border-style: solid;
  margin-right: 0.5em;
  border-radius: 0.25em;
}

.input {
  @mixin sr-only;
  &:checked + label {
    &.vegetarian {
      background-color: var(--color-green);
    }
    &.meat {
      background-color: var(--color-red);
    }
    &.fish {
      background-color: var(--color-blue);
    }
  }

  &:focus + label {
    &.vegetarian {
      border-color: var(--color-green-dark);
    }
    &.meat {
      border-color: var(--color-red-dark);
    }
    &.fish {
      border-color: var(--color-blue-dark);
    }
  }
}

svg {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
}
</style>
