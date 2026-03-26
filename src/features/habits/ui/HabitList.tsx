import { AnimatePresence } from "framer-motion"
import HabitItem from "./HabitItem"

interface Props {
  habits: string[]
  done: string[]
  toggle: (habit: string) => void
  deleteHabit: (habit: string) => void
}

export default function HabitList({ habits, done, toggle, deleteHabit }: Props) {
  return (
    <section className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden flex-1 min-h-0 pr-4">
      <AnimatePresence mode="popLayout">
        {habits.map((habit, i) => (
          <HabitItem
            key={habit}
            habit={habit}
            done={done.includes(habit)}
            index={i}
            toggle={toggle}
            deleteHabit={deleteHabit}
          />
        ))}
      </AnimatePresence>
    </section>
  )
}