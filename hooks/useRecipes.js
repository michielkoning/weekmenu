import { useState } from "react";

const RECIPES = [
  {
    id: 1,
    day: "Za",
    title: "Bloemkoolsoufflé",
    tags: ["Vegetarisch"],
  },
  {
    id: 2,
    day: "Zo",
    title: "Courgettelasagne",
    tags: ["Vegetarisch"],
  },
  {
    id: 3,
    day: "Ma",
    title: "Gevulde bolcourgette",
    tags: ["Vegetarisch"],
  },
  {
    id: 4,
    day: "Di",
    title: "Kerriekokos paksoi",
    tags: ["Vegetarisch", "Rijst"],
  },
  {
    id: 5,
    day: "Wo",
    title: "Zalmlasagne",
    tags: ["Vis", "Pasta"],
  },
];

export default () => {
  const [recipes, setRecipes] = useState(RECIPES);

  const filterRecipes = (term) => {
    if (term) {
      setRecipes(
        RECIPES.filter((r) =>
          r.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setRecipes(RECIPES);
    }
  };

  return [recipes, filterRecipes];
};
