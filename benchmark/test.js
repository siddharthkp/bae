const spawnSync = require('child_process').spawnSync
const Table = require('cli-table2')
const {yellow} = require('colors/safe')

console.log(yellow('Running benchmarks...'))

const options = '-o /dev/null -w %{time_starttransfer}:%{time_total} -s localhost:3000'.split(' ')

const attempts = 10

const results = {
  ttfb: [],
  total: []
}

for (let i = 0; i < attempts + 1; i++) {

  // Make a request to localhost:3000
  const result = spawnSync('curl', options, {encoding: 'utf8'})

  // The first request is always slower because of warmup, ignore this request
  if (i === 0) continue

  // The output is time to first bite : total time taken
  let ttfb = result.stdout.split(':')[0]
  let total = result.stdout.split(':')[1]
  results.ttfb.push(parseInt(parseFloat(ttfb) * 1000, 10))
  results.total.push(parseInt(parseFloat(total) * 1000, 10))
}

const average = elements => {
  const sum = elements.reduce((a, b) => parseFloat(a) + parseFloat(b))
  return parseInt(sum/elements.length, 10)
}

let table = new Table({head: ['run', 'ttfb (ms)', 'total (ms)']})
for (let i = 0; i < attempts; i++) table.push([i + 1, results.ttfb[i], results.total[i]])
table.push(
  ['average', average(results.ttfb), average(results.total)]
  .map(text => yellow(text))
)

console.log(table.toString())
