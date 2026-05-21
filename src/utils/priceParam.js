import { priceDiscounted } from "./priceDescounted";

export const buildParam = (query, category, price, page, sort) => {
  const paramsObj = {};

  if (query) paramsObj.q = query;
  if (category) paramsObj.category = category;
  paramsObj._page = page;
  paramsObj._limit = 6;
  if (sort) paramsObj.sort = sort;

  if (sort === "price-asc") {
    paramsObj._sort = "price";
    paramsObj._order = "asc";
  }

  if (sort === "price-desc") {
    paramsObj._sort = "price";
    paramsObj._order = "desc";
  }

  if (sort === "rating") {
    paramsObj._sort = "rating";
    paramsObj._order = "desc";
  }

  if (price === "0-200") {
    paramsObj.price_lte = 200;
  } else if (price === "201-400") {
    paramsObj.price_gte = 201;
    paramsObj.price_lte = 400;
  } else if (price === "401-600") {
    paramsObj.price_gte = 401;
    paramsObj.price_lte = 600;
  } else if (price === "601-800") {
    paramsObj.price_gte = 601;
    paramsObj.price_lte = 800;
  } else if (price === "801-1000") {
    paramsObj.price_gte = 801;
    paramsObj.price_lte = 1000;
  } else if (price === "1000+") {
    paramsObj.price_gte = 1000;
  }

  return paramsObj;
};
