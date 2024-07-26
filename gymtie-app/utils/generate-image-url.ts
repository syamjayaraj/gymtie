const domainUrl = "http://localhost:1337";
const generateImageUrl = (url: string) => {
  if (url) {
    return `${domainUrl}${url}`;
  } else {
    return ``;
  }
};
export default generateImageUrl;
