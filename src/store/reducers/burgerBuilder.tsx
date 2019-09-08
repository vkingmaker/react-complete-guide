import { ActionTypes } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

interface AppState {
  ingredients: { [key: string]: number };
  totalPrice: number;
  error?: boolean;
  building?: boolean;
}

interface BurgerAction {
  ingredientName?: 'salad' | 'bacon' | 'cheese' | 'meat';
  ingredients?: { [key: string]: number };
  type: string;
  error?: boolean;
}

const initialState = {
  ingredients: {},
  totalPrice: 4,
  error: false,
  building: false
};

enum INGREDIENT_PRICES {
  salad = 0.5,
  cheese = 0.4,
  meat = 1.3,
  bacon = 0.7
}

const addIngredient = (state: AppState, action: BurgerAction) => {
  if (action.ingredientName) {
    const updatedIngredient = {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(
      state.ingredients,
      updatedIngredient
    );
    const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      building: true
    };
    return updateObject(state, updatedState);
  }
};

const removeIngredient = (state: AppState, action: BurgerAction) => {
  if (action.ingredientName) {
    const updatedIng = {
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
      ingredients: updatedIngs,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      building: true
    };
    return updateObject(state, updatedSt);
  }
};

const setIngredients = (state: AppState, action: BurgerAction) => {
  if (action.ingredients) {
    return updateObject(state, {
      ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
      },
      totalPrice: 4,
      error: false,
      building: false
    });
  }
};

const fetchIngredientsFailed = (state: AppState, action: BurgerAction) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action: BurgerAction) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case ActionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case ActionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case ActionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
