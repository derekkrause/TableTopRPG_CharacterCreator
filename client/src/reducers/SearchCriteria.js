import { SET_SEARCH_CRITERIA } from "../constants/ActionTypes";

export default function SearchCriteria(state, action) {
  if (!state) {
    return {
      collapsed: true,
      searchString: "",
      search: "",
      searchType: "all",
      locationFilter: "",
      gradYearFilter: "",
      sportFilter: null,
      sportLevelFilter: "",
      sportPositionFilter: "",
      schoolFilter: "",
      coachTitleFilter: "",
      eventTypeFilter: "",
      eventStartDateFilter: "",
      eventEndDateFilter: "",
      venueTypeFilter: "",
      articleTypeFilter: "",
      articleTagFilter: "",
      radius: 10
    };
  }

  // { type: SET_SEARCH_CRITERIA, searchCriteria: {<stuff in here>} }
  if (action.type === SET_SEARCH_CRITERIA) {
    return action.searchCriteria;
  }
  return state;
}
