export const paginate = async (model, query, page, limit, populate = []) => {
  const skip = (page - 1) * limit;

  // Run query and count in parallel for better performance
  const [data, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit).populate(populate),
    model.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
    count: data.length,
  };
};
