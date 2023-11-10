<script lang="ts" setup>
import FormSelect from '@/components/Forms/Elements/FormSelect.vue'
import { computed } from 'vue'
import type { IOption } from '@/interfaces/IOption'
import useWeekmenu from '@/composables/useWeekmenu'
import useRecipes from '@/composables/useRecipes'
import type { WeekmenuRecipe } from '@/interfaces/IWeekMenu'

const props = defineProps<{
  weekmenuRecipe: WeekmenuRecipe
  index: number
}>()

const { update, removeDay } = useWeekmenu()
const { recipes } = useRecipes()

const options = computed(() => {
  const defaultOption: IOption = {
    value: '',
    title: 'Geen keuze'
  }
  const recipeOptions = recipes.value.map((recipe) => {
    return {
      title: `${recipe.title}`,
      value: recipe.id
    }
  })

  return [defaultOption, ...recipeOptions]
})

const set = (value: string) => {
  const recipeId = value ? value : null
  update(props.weekmenuRecipe.id, recipeId)
}
</script>

<template>
  <div>
    <form-select
      id="test"
      :title="`Dag ${index + 1}`"
      :model-value="weekmenuRecipe.recipe?.id || ''"
      :options="options"
      @change="set($event.target.value)"
    />
    <button @click="removeDay(weekmenuRecipe.id)">Remove</button>
  </div>
</template>
