import { Plus } from "lucide-react"

interface Props {
  newHabit: string
  setNewHabit: (val: string) => void
  addHabit: () => void
  error: string
  errorVisible: boolean
  hideError: () => void
}

export default function HabitInput({ newHabit, setNewHabit, addHabit, error, errorVisible, hideError }: Props) {
  return (
    <section className="flex flex-col items-center gap-3 mb-6">
      <span className="text-gray-400 text-sm">Добавить новую привычку:</span>
      <div className="w-full relative">
        <input
          type="text"
          value={newHabit}
          className="outline-none w-full bg-gray-800 text-white rounded-lg px-4 py-2"
          placeholder="Название привычки"
          onChange={(e) => { setNewHabit(e.target.value); hideError() }}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
        />
        {error && (
          <span
            className="bg-gray-900 border border-red-400 rounded-lg px-2 py-2 absolute translate-y-1/2 bottom-1/2 right-0 text-red-400 text-sm"
            style={{ animation: `${errorVisible ? "fadeIn" : "fadeOut"} 1s ease forwards` }}
          >
            {error}
          </span>
        )}
      </div>
      <button
        className="bg-green-500 text-white flex items-center gap-2 rounded-lg px-2 py-1 mt-2"
        onClick={addHabit}
      >
        <Plus className="w-4 h-4" /> Добавить
      </button>
    </section>
  )
}