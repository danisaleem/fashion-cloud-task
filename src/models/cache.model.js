module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      key: String,
      value: String,
      updatedAt: { type: Date, expires: "5m", default: Date.now },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cache = mongoose.model("cache", schema);
  return Cache;
};
