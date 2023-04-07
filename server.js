const express = require('express')
const fallback = require('express-history-api-fallback')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('./dist/'))
app.use(fallback('dist/index.html', { root: `${__dirname}/` }))
app.listen(PORT, () => console.log(`App started on ${PORT}`))
