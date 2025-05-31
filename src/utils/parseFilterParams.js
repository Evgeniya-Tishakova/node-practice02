const parseCategory = (category) => {
  const categories = ['books', 'electronics', 'clothing', 'other'];

  if (!categories.includes(category)) {
    return undefined;
  }

  return category;
};

const parseNum = (num) => {
  const parsedNum = Number(num);
  if (typeof parsedNum !== 'number') {
    return undefined;
  }

  return parsedNum;
};

export const parseFilterParams = (query) => {
  const { category, minPrice, maxPrice } = query;

  const parsedCategory = parseCategory(category);
  const parsedMinPrice = parseNum(minPrice);
  const parsedMaxPrice = parseNum(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
