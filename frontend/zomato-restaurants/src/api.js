
export async function restaurantById(id) {
  try {
    const response = await fetch(`/api/restaurant/${id}`);
    const data = await response.json();
    // console.log("Data from id in api.js - ",data); //need to remove
    return data;
  } catch (error) {
    console.error("This error occured in RestaurantById in api.js - ", error);
  }
}

export async function restaurantByName(name) {
  try {
    const response = await fetch(`/api/restaurant/name/${name}`);
    const data = await response.json();
    // console.log("Data from name in api.js",data); //need to remove
    return data;
  } catch (error) {
    console.error("This error occured in RestaurantById in api.js - ", error);
  }
}

export async function restaurantsList(page, limit) {
  page = page || 1;
  limit = limit || 10;
  try {
    const response = await fetch(
      `/api/restaurants?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("data from list in api.js - ",data); //need to remove
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchByLocation(latitude, longitude, page) {
  try {
    const response = await fetch(
      `/api/restaurants/location?latitude=${latitude}&longitude=${longitude}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          latitude: latitude,
          longitude: longitude,
          page: page,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    
    if (data.error) {
      throw new Error(data.error);
    }
    // console.log("Data from location in api.js - ",data); //need to remove
    return data;
  } catch (error) {
    console.error(error);
  }
}

// export async function SearchByCuisine(cuisine, page, limit) {
//   const response = await fetch(`${apiUrl}/restuarants/cuisine`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     params: {
//       cuisine: cuisine,
//       page: page || 1,
//       limit: limit || 10,
//     },
//   });
//   const data = await response.json();
//   if (response.status >= 400) {
//     throw new Error(data.errors);
//   }
//   if (data.error) {
//     throw new Error(data.error);
//   }
//   return data;
// }
