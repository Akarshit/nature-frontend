import { getSuggestions } from '../api.js';

export const suggestAction = async (set, get, { query }) => {
  const { success, failure } = await getSuggestions({
    query,
  });
  if (failure) {
  }
  console.log(success);
  const { data: outings } = success;

  // Format data into heirarchy
  const newData = [];
  const parents = {};
  outings.forEach((outing) => {
    if (!outing.parent_id) {
      parents[outing.entity_id] = {
        ...outing,
        children: [],
      };
    }
  });
  for (const outing of outings) {
    if (outing.parent_id) {
      if (outing.parent_id in parents) {
        // This is a child
        parents[outing.parent_id].children.push(outing);
      } else {
        // This is a orphan child
        parents[outing.entity_id] = outing;
      }
    }
  }
  const suggestedResults = Object.values(parents);
  set(
    { suggestedResults, showSuggestions: true },
    false,
    'search.suggestAction'
  );
};
