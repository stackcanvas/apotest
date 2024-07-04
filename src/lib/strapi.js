import qs from "qs";

export const getSingleService = async (endpoint, query) => {
  const mergedOptions = {
    next: { revalidate: 10 },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  };

  const queryString = qs.stringify(query);

  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}&${queryString}`;

  try {
    const res = await fetch(requestUrl, mergedOptions);
    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
