import { useEffect, useState } from "react"


export default function App() {
  /* Список привычек */
  const [habits, setHabits] = useState<string[]>(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : ["Спорт", "Чтение", "Вода", "Сон до 23:00"]
  })
  /* Выполненные привычки */
  const [done, setDone] = useState<string[]>(() => {
    const saved = localStorage.getItem('doneHabits')
    return saved ? JSON.parse(saved) : []
  })
  /* Новая привычка */
  const [newHabit, setNewHabit] = useState('')
  /* Заполнение списка привычек в localStorage */
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])
  /* Сохранение в localStorage */
  useEffect(() => {
    localStorage.setItem('doneHabits', JSON.stringify(done))
  }, [done])
  /* Выполенна/Не выполенна привычка */
  const toggle = (habit: string) => {
    if (done.includes(habit)) {
      setDone(done.filter(h => h !== habit))
    } else {
      setDone([...done, habit])
    }
  }
  /* Добавление новой привычки */
  const addHabit = () => {
    if (newHabit.trim() === '') return
    setHabits([...habits, newHabit])
    setNewHabit('')
  }

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center'>
      <div className='bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl'>
        <h1 className="text-white text-2xl font-bold mb-6">Трекер привычек</h1>
        <div className='flex flex-col items-center gap-3 mb-6'>
          <span className="text-gray-400 text-sm">Добавить новую привычку:</span>
          <input
            type='text'
            value={newHabit}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 mt-2"
            placeholder="Название привычки"
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
          />
          <button
            className="bg-green-500 text-white rounded-lg px-4 py-2 mt-2"
            onClick={() => addHabit()}
          >
            Добавить
          </button>
        </div>
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