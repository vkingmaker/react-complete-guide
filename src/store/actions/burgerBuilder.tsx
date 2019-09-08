import { ActionTypes } from './actionTypes';
import axios from '../../axios-orders';
import { Dispatch } from 'redux';
import { IngredientsType } from '../../shared/types';

export const addIngredient = (name: string) => {
  return {
    type: ActionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name: string) => {
  return {
    type: ActionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients: IngredientsType) => {
  return {
    type: ActionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: ActionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return (dispatch: Dispatch) => {
    axios
      .get('https://burger-king-a2f18.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
