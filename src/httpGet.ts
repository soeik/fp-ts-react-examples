import axios from 'axios'
import { left, right } from 'fp-ts/lib/Either'
export const httpGet = <T>(url:string) =>
        axios.get(url)
            .then(r => right(r.data))
            .catch(left);

