import redis from "../../lib/redis";
import axios from "axios";



export default async function handler(req, res) {
    let start = Date.now();
    let result = {}
    let cache = await redis.get('employees');
    cache = JSON.parse(cache);


    if (cache) {
        result.data = cache;
        result.type = 'redis';
        result.latency = Date.now() - start;
        return res.status(200).json(result);
    } else {
    console.log('Fetching data')
    start = Date.now();
    return axios.get("https://certifyprogdl.azurewebsites.net/getUsers", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Server': 'gunicorn'
        }
    })
        .then(response => {
            result.data = response.data;
            result.type = 'api';
            result.latency = Date.now() - start;
            redis.set('employees', JSON.stringify(response.data));
            return res.status(200).json(result);
        })

    }


}