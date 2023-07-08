function formatLocation(address, city, state) {
  return `${address} • ${city}, ${state}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

function formatPrice(price) {
  return price === 0 ? "Free" : "$" + price.toFixed(2);
}

export { formatLocation, formatDate, formatPrice };
