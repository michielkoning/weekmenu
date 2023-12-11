<script lang="ts" setup>
import type { IIngredient } from '@/interfaces/IRecipe'
import useEaters from '@/composables/useEaters'

defineProps<{
  ingredients: IIngredient[]
}>()
const { totalEaters } = useEaters()
</script>

<template>
  <section :aria-labelled="$t('details.ingredients')" class="ingredients">
    <h2>{{ $t('details.ingredients') }}</h2>
    <ul>
      <li v-for="ingredient in ingredients" :key="ingredient.title">
        <span v-if="ingredient.amount">
          {{ $n(ingredient.amount * totalEaters, 'decimal') }}
        </span>
        {{ ingredient.title }}
      </li>
    </ul>
  </section>
</template>

<style lang="postcss" scoped>
@import '@/assets/css/media-queries/media-queries.css';

h2 {
  padding-bottom: 0.5em;
  display: none;

  @media (--viewport-md) {
    display: block;
  }
}

ul {
  list-style: none outside;
  padding-left: 0;
  margin-bottom: 2em;
  border-top: 1px dashed var(--black);
}

li {
  padding-block: 0.25em;
  border-bottom: 1px dashed var(--black);
}
</style>
