let { nanoid } = require("nanoid");
var slugify = require("slugify");

let generateSlug = (name) => {
  let uniqueId = nanoid(5);
  let slugifiedName = slugify(name, {
    lower: true,
  });
  slugifiedName = slugifiedName + "-" + uniqueId;
  return slugifiedName;
};

module.exports = generateSlug;
