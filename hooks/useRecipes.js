import { useState } from "react";

const RECIPES = [
  {
    day: "Za",
    title: "Bloemkoolsoufflé",
    tags: ["Vegetarisch"],
  },
  {
    day: "Zo",
    title: "Courgettelasagne",
    tags: ["Vegetarisch"],
  },
  {
    day: "Ma",
    title: "Gevulde bolcourgette",
    tags: ["Vegetarisch"],
  },
  {
    day: "Di",
    title: "Kerriekokos paksoi",
    tags: ["Vegetarisch", "Rijst"],
  },
  {
    day: "Wo",
    title: "Zalmlasagne",
    tags: ["Vis", "Pasta"],
  },
];


export default () => {

  const [recipes, setRecipes] = useState(RECIPES);

  const filterRecipes = (term) => {
    if (term) {
      setRecipes(recipes.filter(r => r.title.toLowerCase().includes(term.toLowerCase())))
    } else {
      setRecipes(RECIPES)
    }
  }

  return [recipes, setRecipes, filterRecipes]
};
