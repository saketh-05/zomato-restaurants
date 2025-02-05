let apiUrl = "http://127.0.0.1:8000";

export async function restaurantById(id) {
  const response = await fetch(`${apiUrl}/restaurant/${id}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

export default async function restaurantsList(page, limit) {
    page = (page) || 1;
    limit = (limit) || 10;
  try {
    const response = await fetch(`${apiUrl}/restaurants?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function SearchByLocation(latitude, longitude, page, limit) {
  const response = await fetch(`${apiUrl}/restaurants/location`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      latitude: latitude,
      longitude: longitude,
      page: page || 1,
      limit: limit || 10,
    },
  });
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

export async function SearchByCuisine(cuisine, page, limit) {
  const response = await fetch(`${apiUrl}/restuarants/cuisine`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      cuisine: cuisine,
      page: page || 1,
      limit: limit || 10,
    },
  });
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}
