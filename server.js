const http = require('http')

const app = require('./app')

const cluster = require('cluster')

if (cluster.isMaster) {

  // Fetch Number of Workers
  const numWorkers = require('os').cpus().length

  console.log('Master cluster setting up ' + numWorkers + ' workers...')

  // Fork the process and make clusters
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  // Cluster Method for Online
  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
  })

  // Cluster Method for Exit
  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork()
  })
} else {

  // Define Application port
  const port = process.env.PORT || 3000

  // Defining the Host Name
  const host = process.env.HOST || '0.0.0.0'

  // Environment State Variable
  const env = process.env.NODE_ENV || 'development'

  // Creating Server
  const server = http.createServer(app)

  // Exposing the server to the desired port
  server.listen(port, host, () => {
    console.log(`
    
  ⚙️  Server running at: \n\t http://${host}:${port}
  
  🌏 Environment: \n\t ${env}

  💻 Process: \n\t ${process.pid} is listening to all incoming requests
  `)
  })
}