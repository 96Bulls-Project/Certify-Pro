import redis from "../../lib/redis";
import axios from "axios";

export default async function handler(req, res) {
    const { year1, year2 } = req.query;

    let start = Date.now();
    let result = {}
    let cache = await redis.get('certificationsObtainedComparison'+year1+year2);
    cache = JSON.parse(cache);


    if (cache) {
        result.data = cache;
        result.type = 'redis';
        result.latency = Date.now() - start;
        return res.status(200).json(result);
    } else {
        console.log('Fetching data')
        start = Date.now();
        return axios.get("https://certifyprogdl.azurewebsites.net/getRecentMontlyInfo")
            .then(response => {
                result.data = {year1: response.data[year1], year2: response.data[year2]}
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set('certificationsObtainedComparison'+year1+year2, JSON.stringify(result.data));
                return res.status(200).json(result);
            })

    }


}