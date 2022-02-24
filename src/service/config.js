let BASE_URL = ''
let TIME_OUT = 5000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'https://lianghj.top:8888/api/private/v1/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://coderwhy.org/prod'
} else {
  BASE_URL = 'htts://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }
