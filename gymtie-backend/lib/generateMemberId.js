const generateMemberId = (entryCount) => {
  const idLength = 5;
  const formattedID = String(entryCount + 1).padStart(idLength, "0");
  console.log(formattedID, "lorem");
  return formattedID;
};

module.exports = generateMemberId;
