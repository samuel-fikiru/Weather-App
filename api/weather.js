export default {
    fetch(request){
        const key= process.env.OPENWEATHER_API_KEY;
        
        return new Response(key? "key exists" : "key missing");
    }
}