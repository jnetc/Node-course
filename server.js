const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})


app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', 'public')

// Express middleware // для аутификации пользователейб всплывающих окнах
// без next() дальше это не пройдет
// Используем для того, что должно идти от клиента
// app.use((req, res, next) => {
//   const now = new Date().toString()
//   const log = `${now}: ${req.method} ${req.url}`

//   console.log(log);
//   fs.appendFile('server.log', log + '\n', err => {
//     if (err) {
//       console.log('Unable to append to server.log');
//     }
//   })
//   next()
// })



app.get('/', (req, res, next) => {
  res.render('home.hbs', {
    title: 'Home',
    h1: 'Welcome',
    welcome: 'Hello Express & handlebars',
  })
})

app.get('/about', (req, res, next) => {
  res.render('about.hbs', {
    title: 'Handlebars',
    h1: 'Hello Express & handlebars',
  })
})


app.use((req, res, next) => {
  res.status(404).render('404.hbs', {
    title: '404',
    h1: '404 error',
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running... at port ${PORT}`))