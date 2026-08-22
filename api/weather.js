export default {
  async fetch(request) {
    const url = new URL(request.url);

    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    return Response.json(data);
  },
};