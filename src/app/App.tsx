import { HeaderMenu, HabitList, ProgressBar, useHabits } from "@/features/habits"

export default function App() {
  const {
    habits, done, newHabit, setNewHabit, error, errorVisible,
    progress, toggle, addHabit, deleteHabit, hideError, resetDay
  } = useHabits()

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 pb-4 w-full max-w-md shadow-xl flex flex-col h-[80vh]">
        <HeaderMenu
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          addHabit={addHabit}
          resetDay={resetDay}
          error={error}
          errorVisible={errorVisible}
          hideError={hideError}
        />
        {/* Прогресс */}
        <ProgressBar progress={progress} />
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
