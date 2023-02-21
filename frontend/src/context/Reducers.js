export const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_USER_FAIL":
      return {
        ...state,
        user: [],
      };
    default:
      return state;
  }
};
export const articleReducer = (state, action) => {
  //always keep the latest createdAt first
  
  switch (action.type) {
    case "FETCH_ARTICLES":

      return {
        ...state,
        articles: action.payload,
      };
    case "ADD_ARTICLE":
      return { ...state, articles: [...state.articles, action.payload] };
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article._id !== action.payload
        ),
      };
    case "UPDATE_ARTICLE":
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === action.payload._id ? action.payload : article
        ),
      };
    default:
      return state;
  }
};


