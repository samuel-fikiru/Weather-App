export default{
    async fetch(request){
        const url = new URL(request.url);

        const locationinput = url.searchParams.get('location');

        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationinput}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`);
        const data = await response.json();

    
        return Response.json(data);
    }
};


// process.env.OPENWEATHER_API_KEY - vercel env variable