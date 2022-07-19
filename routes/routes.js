const { Router } = require('express')
const router = Router()
const Vote = require('../models/Vote')
const Log = require('../models/Log')

router.post('/vote', async (req, res) => {
  const now = new Date().toLocaleDateString()
  const data = new Vote({
    number: req.body.number,
    date: now.replace(/[\.\/]/g, '-')
  })
  await data.save()
  const newLog = new Log({
    url: '/vote',
    json: req.body,
    date: new Date().toLocaleString()
  })
  await newLog.save()

  const dateNow = new Date().toLocaleDateString().replace(/[\.\/]/g, '-')
  const votes = await Vote.find({
    date: dateNow
  })
  let newData = []
  votes.forEach(obj => {
    let index = newData.findIndex(item => item.number === obj.number)
    if (index < 0) {
      newData.push({ number: obj.number, count: 1 })
    }
    else (newData[index].count = newData[index].count + 1)
  })
  res.json(newData)
})

router.get('/statistic', async (req, res) => {
  let date
  if (req.query.date) { date = req.query.date.replace(/[\.\/]/g, '-') }
  else { date = new Date().toLocaleDateString().replace(/[\.\/]/g, '-') }
  const votes = await Vote.find({
    date: date
  })
  let data = []
  votes.forEach(obj => {
    let index = data.findIndex(item => item.number === obj.number)
    if (index < 0) {
      data.push({ number: obj.number, count: 1 })
    }
    else (data[index].count = data[index].count + 1)
  })
  const newLog = new Log({
    url: '/statistic',
    json: {
      queryParams: req.query.date,
    },
    date: new Date().toLocaleString()
  })
  await newLog.save()
  res.json(data)
})

router.get('/logs', async (req, res) => {
  const logs = await Log.find({})
  const newLog = new Log({
    url: '/logs',
    json: {},
    date: new Date().toLocaleString()
  })
  await newLog.save()
  res.json(logs)
})

router.get('/test', async (req, res) => {
  console.log('ok')
  res.json('ok')
})



module.exports = router