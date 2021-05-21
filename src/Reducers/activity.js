export default (activity = [], action) => {
    switch (action.type) {
      case "FETCH_ALL":
        return activity;
      case "SAVE":
        return [...activity, action.payload];
      case "UPDATE":
        return activity.map((item) => (item._id === action.payload._id ? action.payload : item));
      default:
        return activity;
    }
  };