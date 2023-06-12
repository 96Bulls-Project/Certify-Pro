import redis from "../../lib/redis";
import axios from "axios";

export default async function handler(req, res) {
    const { year1, year2, accum=false } = req.query;

    let start = Date.now();
    let result = {}
    let cache = await redis.get('certificationsObtainedComparison'+year1+year2+accum);
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
                if (!accum) {
                    result.data = {year1: response.data[year1], year2: response.data[year2]}
                } else {
                    const accumYear1 = [response.data[year1][0]]
                    const accumYear2 = [response.data[year2][0]]

                    for (let i = 1; i < response.data[year1].length; i++) {
                        accumYear1.push(accumYear1[i-1] + response.data[year1][i])
                        accumYear2.push(accumYear2[i-1] + response.data[year2][i])
                    }

                    result.data = {year1: accumYear1, year2: accumYear2}
                }
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set('certificationsObtainedComparison'+year1+year2+accum, JSON.stringify(result.data));
                return res.status(200).json(result);
            })

    }


}