<script lang="ts" setup>
import { computed } from "vue";
import type { IRecipe } from "@/types/IRecipe";
import AppIcon from "@/components/Icons/AppIcon.vue";

const props = defineProps<{
  recipe: IRecipe;
}>();

const host = computed(() => {
  if (props.recipe.source) {
    try {
      const url = new URL(props.recipe.source);
      if (url) {
        return url.hostname.replace("www.", "");
      }
    } catch (error) {
      return null;
    }
    return props.recipe.source;
  }
  return null;
});

const hasMeta = computed(() => {
  return props.recipe.preperationTime || props.recipe.source;
});
</script>

<template>
  <dl v-if="hasMeta">
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
        <a v-if="host" :href="recipe.source" target="_blank" rel="nofollow">
          {{ host }}
        </a>
        <span v-else>{{ recipe.source }}</span>
      </dd>
    </template>
  </dl>
</template>

<style lang="postcss" scoped>
dl {
  font-size: 0.8em;
  margin-bottom: 1.5em;
}

dt,
dd {
  display: inline-block;
}

dt {
  padding-top: 0.1em;
}

dd {
  &:not(:last-child)::after {
    display: inline-block;
    margin-inline: 0.75em;
    content: "|";
  }
}

a {
  color: currentColor;
}

.icon {
  margin-right: 0.5em;
  transform: translateY(0.25em);
  width: 1.25em;
  height: 1.25em;
}
</style>
