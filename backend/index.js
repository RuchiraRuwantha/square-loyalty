import express, { json } from 'express'
import cors from 'cors'
import NodeCache from 'node-cache'

const app = express()
app.use(json())
app.use(cors())

// In-memory cache
const cache = new NodeCache()

const mockRewards = [
  { id: 'reward-1', name: 'Free Coffee', cost_points: 50 },
  { id: 'reward-2', name: 'Free Muffin', cost_points: 30 },
]

const mockHistory = {
  'acc-123': [
    {
      id: 'act-1',
      type: 'EARN',
      points: 10,
      created_at: '2025-09-01T10:00:00Z',
      order_id: 'ord-1234',
      program_id: 'program-1',
    },
    {
      id: 'act-2',
      type: 'REDEEM',
      points: -5,
      created_at: '2025-09-05T09:30:00Z',
      reward_id: 'reward-1',
    },
    {
      id: '3',
      created_at: '2025-09-15T19:30:00Z',
      type: 'ADJUSTMENT',
      points: 5,
      description: 'Manual balance correction',
    },
  ],
}

// one fake account
cache.set('acc-123', {
  id: 'acc-123',
  phone_number: '+14155551234',
  balance: 10,
  program_id: 'program-1',
})

// ---- Routes ---- //

// 1. Login
app.post('/api/login', (req, res) => {
  const { phone_number } = req.body

  // Try to find existing account
  let account = cache
    .keys()
    .map((key) => cache.get(key))
    .find((acc) => acc.phone_number === phone_number)

  if (!account) {
    // Create new fake account
    account = {
      id: `acc-${Date.now()}`,
      phone_number,
      balance: 0,
      program_id: 'program-1',
    }
    cache.set(account.id, account)
    mockHistory[account.id] = []
  }

  res.json(account)
})

// 2. Get Balance
app.get('/api/accounts/:id', (req, res) => {
  const account = cache.get(req.params.id)
  if (!account) return res.status(404).json({ message: 'Account not found' })
  res.json(account)
})

// 3. Get History
app.post('/api/accounts/:id/history', (req, res) => {
  const history = mockHistory[req.params.id] || []
  res.json(history)
})

// 4. Earn Points
app.post('/api/accounts/:id/earn', (req, res) => {
  const { order_id, program_id } = req.body
  const account = cache.get(req.params.id)

  if (!account) return res.status(404).json({ message: 'Account not found' })

  // For mock, just add 10 points
  account.balance += 10
  cache.set(account.id, account)

  const newActivity = {
    id: `act-${Date.now()}`,
    type: 'EARN',
    points: 10,
    order_id,
    program_id,
    created_at: new Date().toISOString(),
  }
  mockHistory[account.id].push(newActivity)

  res.json({ account, activity: newActivity })
})

// 5. Redeem Points
app.post('/api/accounts/:id/redeem', (req, res) => {
  const { reward_id, points } = req.body
  const account = cache.get(req.params.id)
  const reward = mockRewards.find((r) => r.id === reward_id)

  if (!account) return res.status(404).json({ message: 'Account not found' })
  if (!reward) return res.status(400).json({ message: 'Invalid reward' })
  if (account.balance < points) {
    return res.status(400).json({ message: 'Not enough points' })
  }

  // Deduct points
  account.balance -= points
  cache.set(account.id, account)

  const newActivity = {
    id: `act-${Date.now()}`,
    type: 'REDEEM',
    points: -points,
    reward_id,
    created_at: new Date().toISOString(),
  }
  mockHistory[account.id].push(newActivity)

  res.json({ account, reward, activity: newActivity })
})

// Start server
app.listen(process.env.PORT, () => {
  console.log(
    `Mock Square Backend running at http://localhost:${process.env.PORT}`
  )
})
