const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const FAVORITES_STORAGE_KEY = "recipeFinderFavorites";

const ingredientForm = document.querySelector("#ingredient-form");
const ingredientInput = document.querySelector("#ingredient-search");
const cuisineButtons = document.querySelectorAll("[data-cuisine]");
const categoryButtons = document.querySelectorAll("[data-category]");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const resultsCount = document.querySelector("#results-count");
const recipeResults = document.querySelector("#recipe-results");
const favoritesList = document.querySelector("#favorites-list");
const recipeModal = document.querySelector("#recipe-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const closeModalButton = document.querySelector("#close-modal");

let favorites = loadFavorites();

ingredientForm.addEventListener("submit", handleIngredientSearch);
closeModalButton.addEventListener("click", closeModal);

cuisineButtons.forEach((button) => {
  button.addEventListener("click", () => searchByArea(button.dataset.cuisine));
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => searchByCategory(button.dataset.category));
});

renderFavorites();

async function handleIngredientSearch(event) {
  event.preventDefault();

  const ingredient = ingredientInput.value.trim();

  if (!ingredient) {
    showError("Enter at least one ingredient before searching.");
    return;
  }

  await searchByIngredient(ingredient);
}

async function searchByIngredient(ingredient) {
  const firstIngredient = ingredient.split(",")[0].trim();
  const formattedIngredient = firstIngredient.toLowerCase().replaceAll(" ", "_");

  await searchRecipes(`/filter.php?i=${encodeURIComponent(formattedIngredient)}`);
}

async function searchByArea(area) {
  await searchRecipes(`/filter.php?a=${encodeURIComponent(area)}`);
}

async function searchByCategory(category) {
  await searchRecipes(`/filter.php?c=${encodeURIComponent(category)}`);
}

async function searchRecipes(endpoint) {
  showLoading();
  hideError();

  try {
    const data = await fetchFromMealDb(endpoint);
    const recipes = data.meals || [];
    renderRecipeResults(recipes);
  } catch (error) {
    showError(error.message);
    recipeResults.innerHTML = "";
    resultsCount.textContent = "No recipes loaded.";
  } finally {
    hideLoading();
  }
}

async function fetchRecipeDetails(recipeId) {
  showLoading();
  hideError();

  try {
    const data = await fetchFromMealDb(`/lookup.php?i=${recipeId}`);
    const recipe = data.meals ? data.meals[0] : null;

    if (!recipe) {
      throw new Error("No recipe details found.");
    }

    openRecipeModal(recipe);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

async function fetchFromMealDb(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Could not load recipe data. Please try again.");
  }

  return await response.json();
}

function renderRecipeResults(recipes) {
  if (recipes.length === 0) {
    recipeResults.innerHTML = "";
    resultsCount.textContent = "No recipes found. Try a different search.";
    return;
  }

  resultsCount.textContent = `${recipes.length} recipe result${recipes.length === 1 ? "" : "s"} found.`;
  recipeResults.innerHTML = recipes.map(createRecipeCard).join("");

  recipeResults.querySelectorAll("[data-details-id]").forEach((button) => {
    button.addEventListener("click", () => fetchRecipeDetails(button.dataset.detailsId));
  });
}

function createRecipeCard(recipe) {
  const image = recipe.strMealThumb || "https://placehold.co/600x400?text=Recipe";

  return `
    <article class="recipe-card">
      <img src="${image}" alt="${recipe.strMeal}">
      <div class="recipe-card-body">
        <h3>${recipe.strMeal}</h3>
        <ul class="meta-list">
          <li>Source: TheMealDB</li>
          <li>Open details for full recipe</li>
        </ul>
        <button type="button" data-details-id="${recipe.idMeal}">View Details</button>
      </div>
    </article>
  `;
}

function openRecipeModal(recipe) {
  modalTitle.textContent = recipe.strMeal;
  modalBody.innerHTML = createRecipeDetails(recipe);

  const favoriteButton = modalBody.querySelector("[data-favorite-id]");
  favoriteButton.addEventListener("click", () => addFavorite(recipe));

  recipeModal.classList.remove("hidden");
}

function createRecipeDetails(recipe) {
  const image = recipe.strMealThumb || "https://placehold.co/900x500?text=Recipe";
  const ingredients = getIngredientList(recipe);
  const instructions = recipe.strInstructions || "Instructions were not provided by this API response.";

  return `
    <img src="${image}" alt="${recipe.strMeal}">
    <section class="detail-section">
      <h3>Recipe Info</h3>
      <ul class="meta-list">
        <li>Category: ${recipe.strCategory || "Not listed"}</li>
        <li>Cuisine/Area: ${recipe.strArea || "Not listed"}</li>
        <li>Prep time: Not provided by TheMealDB</li>
        <li>Servings: Not provided by TheMealDB</li>
      </ul>
    </section>

    <section class="detail-section">
      <h3>Ingredients</h3>
      <ul class="ingredient-list">
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section">
      <h3>Instructions</h3>
      <p>${instructions}</p>
    </section>

    <section class="detail-section">
      <h3>Nutrition</h3>
      <ul class="nutrition-grid">
        <li>TheMealDB does not provide nutrition data in this recipe response.</li>
      </ul>
    </section>

    <button class="button-secondary" type="button" data-favorite-id="${recipe.idMeal}">
      Add to Favorites
    </button>
  `;
}

function getIngredientList(recipe) {
  const ingredients = [];

  for (let index = 1; index <= 20; index++) {
    const ingredient = recipe[`strIngredient${index}`];
    const measure = recipe[`strMeasure${index}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure || ""} ${ingredient}`.trim());
    }
  }

  return ingredients.length > 0
    ? ingredients
    : ["Ingredients were not provided by this API response."];
}

function addFavorite(recipe) {
  const alreadySaved = favorites.some((favorite) => favorite.idMeal === recipe.idMeal);

  if (alreadySaved) {
    showError("This recipe is already saved in your favorites.");
    return;
  }

  favorites.push({
    idMeal: recipe.idMeal,
    strMeal: recipe.strMeal,
    strMealThumb: recipe.strMealThumb || "",
    strCategory: recipe.strCategory || "",
    strArea: recipe.strArea || "",
  });

  saveFavorites();
  renderFavorites();
  hideError();
}

function renderFavorites() {
  if (favorites.length === 0) {
    favoritesList.innerHTML = `<p class="helper-text">No favorites saved yet.</p>`;
    return;
  }

  favoritesList.innerHTML = favorites
    .map((recipe) => {
      const image = recipe.strMealThumb || "https://placehold.co/600x400?text=Recipe";

      return `
        <article class="favorite-card">
          <img src="${image}" alt="${recipe.strMeal}">
          <div class="favorite-card-body">
            <h3>${recipe.strMeal}</h3>
            <p>${recipe.strCategory || "Category not listed"} · ${recipe.strArea || "Area not listed"}</p>
            <button class="button-danger" type="button" data-remove-id="${recipe.idMeal}">
              Remove
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  favoritesList.querySelectorAll("[data-remove-id]").forEach((button) => {
    button.addEventListener("click", () => removeFavorite(button.dataset.removeId));
  });
}

function removeFavorite(recipeId) {
  favorites = favorites.filter((favorite) => favorite.idMeal !== recipeId);
  saveFavorites();
  renderFavorites();
}

function loadFavorites() {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch (error) {
    console.error("Could not parse saved favorites", error);
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

function closeModal() {
  recipeModal.classList.add("hidden");
}

function showLoading() {
  loadingMessage.classList.remove("hidden");
}

function hideLoading() {
  loadingMessage.classList.add("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

