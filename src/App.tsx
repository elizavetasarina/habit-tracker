import { useEffect, useState } from "react"

const habits = ["Спорт", "Чтение", "Вода", "Сон до 23:00"]

export default function App() {
  const [done, setDone] = useState<string[]>(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(done))
  }, [done])
  const toggle = (habit: string) => {
    if (done.includes(habit)) {
      setDone(done.filter(h => h !== habit))
    } else {
      setDone([...done, habit])
    }
  }

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center'>
      <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl'>
        <h1 className="text-white text-2xl font-bold mb-6">Трекер привычек</h1>
        <div className="flex flex-col gap-3">
          {habits.map(habit => (
            <label
              key={habit}
              className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${done.includes(habit)
                  ? "bg-green-500/20 border border-green-500/40"
                  : "bg-gray-800 border border-gray-700 hover:border-gray-500"
                }`}
            >
              <input
                type="checkbox"
                checked={done.includes(habit)}
                onChange={() => toggle(habit)}
                className="w-5 h-5 accent-green-500 cursor-pointer"
              />
              <span className={`text-base ${done.includes(habit) ? "text-green-400 line-through" : "text-gray-200"}`}>
                {habit}
              </span>
            </label>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-6">
          Выполнено: <span className="text-white font-bold">{done.length}</span> из {habits.length}
        </p>
      </div>
    </div>
  )
}