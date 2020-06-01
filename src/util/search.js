/**
 * SelectMultipleFilter needs to parse values from format
 * "has_all:a,b,c,d" or "a,b,c,d"
 */
export const parseSelectFilterOptions = uriComponentValue => {
  return uriComponentValue && uriComponentValue.indexOf(':') >= 0
    ? uriComponentValue.split(':')[1].split(',')
    : uriComponentValue && uriComponentValue.indexOf(':') < 0
    ? uriComponentValue.split(',')
    : [];
};

const flatten = (acc, val) => acc.concat(val);

/**
 * Check if the filter is currently active.
 */
export const findActiveFilter = (filterIds, urlQueryParams, filterConfigs) => {
  const activeQueryParamKeys = filterConfigs
    .filter(config => filterIds.includes(config.id))
    .map(config => config.queryParamName)
    .reduce(flatten, []);

  const queryParamKeys = Object.keys(urlQueryParams);
  const activeKey = queryParamKeys.find(k => activeQueryParamKeys.includes(k));
  return activeKey;
};

/**
 * Check if the filter is currently active.
 */
export const findOptionsForSelectFilter = (filterId, filters) => {
  const filter = filters.find(f => f.id === filterId);
  return filter && filter.config && filter.config.options ? filter.config.options : [];
};
