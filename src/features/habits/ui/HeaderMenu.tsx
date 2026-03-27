import { useEffect, useRef, useState } from "react"
import { MoreVertical, Plus, RefreshCcw, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  newHabit: string
  setNewHabit: (val: string) => void
  addHabit: () => void
  resetDay: () => void
  error: string
  errorVisible: boolean
  hideError: () => void
}

export default function HeaderMenu({
  newHabit, setNewHabit, addHabit, resetDay, error, errorVisible, hideError
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [menuOpen])

  // Close panel automatically when habit was successfully added (newHabit reset to "")
  const prevNewHabit = useRef(newHabit)
  useEffect(() => {
    if (panelOpen && prevNewHabit.current !== "" && newHabit === "") {
      setPanelOpen(false)
    }
    prevNewHabit.current = newHabit
  }, [newHabit, panelOpen])

  const handleAdd = () => {
    addHabit()
  }

  const handleClose = () => {
    setPanelOpen(false)
    setNewHabit("")
    hideError()
  }

  return (
    <div className="mb-4">
      <section className="flex items-center justify-between">
        <span className="text-white text-xl font-bold">Трекер привычек</span>
        <div ref={menuRef} className="relative">
          <button
            className="text-gray-400 hover:text-gray-200 p-1 rounded-lg"
            onClick={() => setMenuOpen(v => !v)}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-lg py-1 min-w-[180px]">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2"
                onClick={() => { setPanelOpen(true); setMenuOpen(false) }}
              >
                <Plus className="w-4 h-4" /> Добавить привычку
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2"
                onClick={() => { resetDay(); setMenuOpen(false) }}
              >
                <RefreshCcw className="w-4 h-4" /> Новый день
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="add-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              <div className="flex gap-2">
                <input
                  autoFocus
                  type="text"
                  value={newHabit}
                  onChange={e => { setNewHabit(e.target.value); hideError() }}
                  onKeyDown={e => {
                    if (e.key === "Enter") handleAdd()
                    if (e.key === "Escape") handleClose()
                  }}
                  placeholder="Название привычки"
                  className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none placeholder-gray-500"
                />
                <button
                  onClick={handleAdd}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-2"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-200 rounded-lg px-2 py-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {error && (
                <span
                  className="text-red-400 text-xs mt-1 block"
                  style={{ animation: `${errorVisible ? "fadeIn" : "fadeOut"} 1s ease forwards` }}
                >
                  {error}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
