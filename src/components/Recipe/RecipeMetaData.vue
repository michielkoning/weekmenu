<script lang="ts" setup>
import { computed } from "vue";
import type { IRecipe } from "@/types/IRecipe";
import AppIcon from "@/components/Icons/AppIcon.vue";

const props = defineProps<{
  recipe: IRecipe;
}>();

const host = computed(() => {
  if (props.recipe.source) {
    const url = new URL(props.recipe.source);
    if (url) {
      return url.hostname;
    }
    return props.recipe.source;
  }
  return null;
});
</script>

<template>
  <dl>
    <template v-if="recipe.preperationTime">
      <dt>
        <app-icon name="Clock" class="icon" />
      </dt>
      <dd>
        {{ recipe.preperationTime }}
        {{ $t("details.minutes") }}
      </dd>
    </template>
    <template v-if="recipe.source">
      <dt>
        <app-icon name="Source" class="icon" />
      </dt>
      <dd>
        <a :href="recipe.source" target="_blank" rel="nofollow">
          {{ host }}
        </a>
      </dd>
    </template>
  </dl>
</template>

<style lang="postcss" scoped>
dl {
  display: grid;
  grid-gap: 0.25em;
  grid-template-columns: 1.5em auto;
}

dt {
  padding-top: 0.1em;
}

.icon {
  width: 1.25em;
  height: 1.25em;
}
</style>
