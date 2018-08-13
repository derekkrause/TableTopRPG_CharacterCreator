import { SET_DROPDOWN_VALUES } from "../constants/ActionTypes";

export default function DropdownOptions(state, action) {
  if (!state) {
    return {};
  }

  // { type: SET_SEARCH_CRITERIA, searchCriteria: {<stuff in here>} }
  if (action.type === SET_DROPDOWN_VALUES) {
    return action.dropdownOptions;
  }
  return state;
}
