import axios from 'axios'
import {tryCatch} from "fp-ts/lib/TaskEither";

export const httpGet = <T>(url:string) => tryCatch<Error, T>(
    () => axios.get(url).then(resp => resp.data),
    reason => new Error(String(reason))
);
