import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { supabase } from './supabase'

const stats = [
  { label: 'Total Revenue', value: '$45,231', change: '+20.1%', up: true },
  { label: 'Users', value: '2,350', change: '+15.3%', up: true },
  { label: 'Orders', value: '1,210', change: '-3.2%', up: false },
  { label: 'Conversion', value: '3.24%', change: '+1.2%', up: true },
]

const recentOrders = [
  { id: '#3210', customer: 'Olivia Martin', email: 'olivia@email.com', amount: '$42.00', status: 'Completed' },
  { id: '#3209', customer: 'Ava Johnson', email: 'ava@email.com', amount: '$74.99', status: 'Pending' },
  { id: '#3208', customer: 'Michael Chen', email: 'michael@email.com', amount: '$125.00', status: 'Completed' },
  { id: '#3207', customer: 'Lisa Anderson', email: 'lisa@email.com', amount: '$89.00', status: 'Cancelled' },
  { id: '#3206', customer: 'Thomas Wilson', email: 'thomas@email.com', amount: '$55.50', status: 'Completed' },
  { id: '#3205', customer: 'James Brown', email: 'james@email.com', amount: '$210.00', status: 'Pending' },
  { id: '#3204', customer: 'Sophia Davis', email: 'sophia@email.com', amount: '$33.00', status: 'Completed' },
]

const allUsers = [
  { name: 'Olivia Martin', email: 'olivia@email.com', role: 'Admin', joined: 'Jan 12, 2024', status: 'Active' },
  { name: 'Ava Johnson', email: 'ava@email.com', role: 'User', joined: 'Feb 3, 2024', status: 'Active' },
  { name: 'Michael Chen', email: 'michael@email.com', role: 'User', joined: 'Mar 18, 2024', status: 'Inactive' },
  { name: 'Lisa Anderson', email: 'lisa@email.com', role: 'Editor', joined: 'Apr 5, 2024', status: 'Active' },
  { name: 'Thomas Wilson', email: 'thomas@email.com', role: 'User', joined: 'May 22, 2024', status: 'Active' },
  { name: 'James Brown', email: 'james@email.com', role: 'User', joined: 'Jun 9, 2024', status: 'Inactive' },
]

const activities = [
  { text: 'New user registered', time: '2 min ago' },
  { text: 'Order #3210 completed', time: '15 min ago' },
  { text: 'Payment received from Ava', time: '1 hr ago' },
  { text: 'Server restarted', time: '3 hr ago' },
  { text: 'New product added', time: '5 hr ago' },
]

const navItems = [
  { name: 'Overview',  path: '/',          icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
  { name: 'Analytics', path: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Orders',    path: '/orders',    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { name: 'Users',     path: '/users',     icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Settings',  path: '/settings',  icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

function StatusBadge({ status }) {
  const colors = {
    Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Inactive: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  )
}

function OverviewPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <span className={`text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-white">{order.id}</td>
                    <td className="px-5 py-3">
                      <p className="text-gray-800 dark:text-gray-200">{order.customer}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">{order.email}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-800 dark:text-gray-200">{order.amount}</td>
                    <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
          </div>
          <div className="p-5 space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function AnalyticsPage() {
  const bars = [60, 80, 45, 90, 70, 55, 85, 40, 75, 95, 65, 50]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track your performance over time.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Page Views', value: '128,430', change: '+12%' },
          { label: 'Avg. Session', value: '3m 42s', change: '+5%' },
          { label: 'Bounce Rate', value: '38.2%', change: '-2%' },
        ].map((m) => (
          <div key={m.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.label}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{m.value}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">{m.change} vs last month</p>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Monthly Revenue</h3>
        <div className="flex items-end gap-2 h-40">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                style={{ height: `${h}%` }}
                title={`$${(h * 450).toLocaleString()}`}
              />
              <span className="text-xs text-gray-400 dark:text-gray-500">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function OrdersPage() {
  const [filter, setFilter] = useState('All')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase.from('orders').select('*').order('id', { ascending: false })
      setOrders(data || [])
      setLoading(false)
    }
    fetchOrders()
  }, [])

  const statuses = ['All', 'Completed', 'Pending', 'Cancelled']
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter)

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Orders</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track all orders.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === s
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400 dark:text-gray-500">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400 dark:text-gray-500">No orders found.</td></tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-white">#{order.id}</td>
                    <td className="px-5 py-3">
                      <p className="text-gray-800 dark:text-gray-200">{order.customer}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">{order.email}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-800 dark:text-gray-200">{order.amount}</td>
                    <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function UsersPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Users</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your user accounts.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white">All Users ({allUsers.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.email} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 flex items-center justify-center font-medium text-xs shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{user.name}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{user.role}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{user.joined}</td>
                  <td className="px-5 py-3"><StatusBadge status={user.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function SettingsPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account preferences.</p>
      </div>
      <div className="max-w-lg space-y-4">
        {[
          { label: 'Full Name', value: 'Admin User', type: 'text' },
          { label: 'Email', value: 'admin@example.com', type: 'email' },
          { label: 'Company', value: 'Acme Inc.', type: 'text' },
        ].map((field) => (
          <div key={field.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
            <input
              type={field.type}
              defaultValue={field.value}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Notifications</p>
          {['Email alerts', 'Order updates', 'Weekly reports'].map((item) => (
            <label key={item} className="flex items-center gap-3 py-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
            </label>
          ))}
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col shrink-0`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            {sidebarOpen && <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  {sidebarOpen && item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-end gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 110 10A5 5 0 0112 7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </div>

          {/* Pages — each path shows a different component */}
          <Routes>
            <Route path="/"          element={<OverviewPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/orders"    element={<OrdersPage />} />
            <Route path="/users"     element={<UsersPage />} />
            <Route path="/settings"  element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
