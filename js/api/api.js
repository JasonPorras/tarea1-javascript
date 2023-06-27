async function fetchEventsByCategory(category) {
  const originUrl = "https://knassbani2.execute-api.us-east-2.amazonaws.com/events/";
  const url = `${originUrl}${category}`;

  return await fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export { fetchEventsByCategory }