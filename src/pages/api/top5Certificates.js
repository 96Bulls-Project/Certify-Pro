import redis from "../../lib/redis";
import axios from "axios";

export default async function handler(req, res) {

    let start = Date.now();
    let result = {}
    let cache = await redis.get('top5Cerficates');
    cache = JSON.parse(cache);


    if (cache) {
        result.data = cache;
        result.type = 'redis';
        result.latency = Date.now() - start;
        return res.status(200).json(result);
    } else {
        console.log('Fetching data')
        start = Date.now();
        return axios.get("https://certifyprogdl.azurewebsites.net/getTop5Certifications")
            .then(response => {
                result.data = response.data;
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set('top5Cerficates', JSON.stringify(response.data));
                return res.status(200).json(result);
            })

    }


}