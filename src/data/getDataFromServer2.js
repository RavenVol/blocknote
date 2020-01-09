const staticUrlPart = 'http://server/api/'

const getDataFromServer = async(dynamicUrlPart, obj) => {
  const response = await fetch(`${staticUrlPart}${dynamicUrlPart}`, {
    method: 'post',
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  return data;
}

export default getDataFromServer;

