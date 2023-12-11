import { ref } from 'vue'

const totalEaters = ref(2)

export default () => {
  const changeAmountofEaters = (value: number) => {
    totalEaters.value = value
  }

  return {
    totalEaters,
    changeAmountofEaters
  }
}
