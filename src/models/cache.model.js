module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      value: String,
      updatedAt: { type: Date, expires: "1h", default: Date.now }, // TTL is 1 HOUR
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
