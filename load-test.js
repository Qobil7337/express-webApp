import http from 'k6/http'
import { check } from 'k6'

export let options = {
    vus: 50,
    iterations: 50,
}

// my notebook could not handle 10 000 requests
// that is why I tested with 50, and it worked
export default function () {
    let res = http.post('http://localhost:3000/api/users/decrease-balance', JSON.stringify({
        userId: 1,
        amount: 1
    }), { headers: { 'Content-Type': 'application/json' } })

    check(res, {
        'is status 200': (r) => r.status === 200,
    })
}
