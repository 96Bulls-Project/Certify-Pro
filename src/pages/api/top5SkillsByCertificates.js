import redis from "../../lib/redis";
import axios from "axios";

export default async function handler(req, res) {
    let start = Date.now();
    let result = {}
    let cache = await redis.get('top5SkillsByCertificates');
    cache = JSON.parse(cache);


    if (cache) {
        result.data = cache;
        result.type = 'redis';
        result.latency = Date.now() - start;
        return res.status(200).json(result);
    } else {
        console.log('Fetching data')
        start = Date.now();
        return axios.get("https://certifyprogdl.azurewebsites.net/certificationsBySkill")
            .then(response => {
                result.data = response.data.slice(0, 5).map(skill => {
                    return {
                        name: skill[0],
                        value: skill[1]
                    }
                });
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set('top5SkillsByCertificates', JSON.stringify(result.data));
                return res.status(200).json(result);
            })

    }


}