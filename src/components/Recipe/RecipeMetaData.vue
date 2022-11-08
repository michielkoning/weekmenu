<script lang="ts" setup>
import type { IRecipe } from "@/types/IRecipe";
import IconClock from "@/components/Icons/IconClock.vue";
import AppIcon from "@/components/Icons/AppIcon.vue";

defineProps<{
  recipe: IRecipe;
}>();
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
