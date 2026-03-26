import { useState } from "react"
import useLocalStorage from "@/shared/hooks/useLocalStorage"

export const useHabits = () => {
    /* Список привычек */
    const [habits, setHabits] = useLocalStorage<string[]>("habits", [
        "Спорт",
        "Чтение",
        "Вода",
        "Сон до 23:00"
    ])
    /* Выполненные привычки */
    const [done, setDone] = useLocalStorage<string[]>("doneHabits", [])
    /* Новая привычка */
    const [newHabit, setNewHabit] = useState("")
    /* Ошибка */
    const [error, setError] = useState("")
    /* Показ ошибки */
    const [errorVisible, setErrorVisible] = useState(false)
    /* Процент прогресса */
    const progress = habits.length === 0 ? 0 : Math.round((done.length / habits.length) * 100)
    /* Выполненна/Не выполенна привычка */
    const toggle = (habit: string) => {
        if (done.includes(habit)) setDone(done.filter(h => h !== habit))
        else setDone([...done, habit])
    }
    /* Добавление новой привычки */
    const addHabit = () => {
        if (newHabit.trim() === "") return showError("Введите название привычки")
        if (habits.some(h => h.toLowerCase() === newHabit.trim().toLowerCase())) {
            showError("Такая привычка уже есть")
            return
        }
        setHabits([...habits, newHabit])
        setNewHabit("")
        setError("")
    }
    /* Удаление привычки */
    const deleteHabit = (habit: string) => {
        setHabits(habits.filter(h => h !== habit))
        setDone(done.filter(h => h !== habit))
    }
    /* Показ ошибки */
    const showError = (msg: string) => {
        setError(msg)
        setErrorVisible(true)
    }
    /* Убрать ошибку */
    const hideError = () => {
        setErrorVisible(false)
        setTimeout(() => setError(""), 300)
    }
    /* Новый день */
    const resetDay = () => setDone([])

    return {
        habits,
        done,
        newHabit,
        setNewHabit,
        error,
        errorVisible,
        progress,
        toggle,
        addHabit,
        deleteHabit,
        showError,
        hideError,
        resetDay
    }
}