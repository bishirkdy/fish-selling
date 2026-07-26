export const buildParam = (query, category, price, page, sort) => {
  const params = {};

  if (query) params.search = query;

  if (category) params.category = category;

  if (sort) params.sort = sort;

  params.page = page;
  params.pageSize = 6;

  switch (price) {
    case "0-200":
      params.maxPrice = 200;
      break;

    case "201-400":
      params.minPrice = 201;
      params.maxPrice = 400;
      break;

    case "401-600":
      params.minPrice = 401;
      params.maxPrice = 600;
      break;

    case "601-800":
      params.minPrice = 601;
      params.maxPrice = 800;
      break;

    case "801-1000":
      params.minPrice = 801;
      params.maxPrice = 1000;
      break;

    case "1000+":
      params.minPrice = 1000;
      break;
  }

  return params;
};