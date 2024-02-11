const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'text/plain'})
    response.end('Hello world')
})

const PORT = 3005
app.listen(PORT)
console.log(`Server running on port ${PORT}`);