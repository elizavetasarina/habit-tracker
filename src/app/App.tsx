import { RefreshCcw } from "lucide-react"
import { HabitInput, HabitList, ProgressBar, useHabits } from "@/features/habits"

export default function App() {
  const {
    habits, done, newHabit, setNewHabit, error, errorVisible,
    progress, toggle, addHabit, deleteHabit, hideError, resetDay
  } = useHabits()

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl flex flex-col h-[80vh]">
        {/* Заголовок */}
        <section className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold mb-6">Трекер привычек</h1>
          <button
            className="bg-green-500 text-white rounded-lg px-2 py-1 mb-6 flex items-center gap-2"
            onClick={resetDay}
          >
            <RefreshCcw className="w-4 h-4" /> Новый день
          </button>
        </section>
        {/* Прогресс */}
        <ProgressBar progress={progress} />
        {/* Добавление новой привычки */}
        <HabitInput
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          addHabit={addHabit}
          error={error}
          errorVisible={errorVisible}
          hideError={hideError}
        />
        {/* Список привычек */}
        <HabitList habits={habits} done={done} toggle={toggle} deleteHabit={deleteHabit} />
        {/* Статистика */}
        <section className="text-gray-400 text-sm mt-6">
          Выполнено: <span className="text-white font-bold">{done.length}</span> из {habits.length}
        </section>
      </div>
    </div>
  )
}