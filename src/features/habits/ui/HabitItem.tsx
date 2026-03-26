import { Trash } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  habit: string
  done: boolean
  index: number
  toggle: (habit: string) => void
  deleteHabit: (habit: string) => void
}

export default function HabitItem({ habit, done, index, toggle, deleteHabit }: Props) {
  return (
    <motion.div
      layout="position"
      className={`flex items-center justify-between relative pr-4 rounded-xl cursor-pointer transition-all 
        ${done
          ? "bg-green-500/20 border border-green-500/40"
          : "bg-gray-800 border border-gray-700 hover:border-gray-500"
        }`}
      initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.25 }}
    >
      <label className="flex items-center gap-3 w-full cursor-pointer p-4">
        <input
          type="checkbox"
          checked={done}
          onChange={() => toggle(habit)}
          className="w-5 h-5 accent-green-500 cursor-pointer"
        />
        <span className={`text-base ${done ? "text-green-400 line-through" : "text-gray-200"}`}>{habit}</span>
      </label>
      <Trash
        className="w-5 h-5 text-gray-400 hover:text-gray-200 cursor-pointer"
        onClick={() => deleteHabit(habit)}
      />
    </motion.div>
  )
}