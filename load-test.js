import http from 'k6/http'
import { check } from 'k6'

export let options = {
    vus: 1000,
    iterations: 10000 ,
}

export default function () {
    let res = http.post('http://localhost:3000/api/users/update-balance', JSON.stringify({
        userId: 1,
        amount: -2
    }), { headers: { 'Content-Type': 'application/json' } })

    check(res, {
        'is status 200 or 400': (r) => r.status === 200 || r.status === 400,
    })
}
