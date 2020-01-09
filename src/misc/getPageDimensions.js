const getPageDimensions = (clName) => {
  const userPageElement = document.getElementsByClassName(clName)[0];
  
  if (userPageElement) {
    return [userPageElement.scrollWidth, userPageElement.scrollHeight];
  }
}

export default getPageDimensions;
