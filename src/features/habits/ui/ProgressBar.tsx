interface Props {
  progress: number
}

export default function ProgressBar({ progress }: Props) {
  return (
    <section className="flex items-center gap-2 mb-6">
      <span className="text-gray-400 text-sm whitespace-nowrap">Прогресс:</span>
      <div className="flex-1 h-3 bg-gray-700 rounded-lg overflow-hidden">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-green-500 rounded-lg transition-all duration-300"
        />
      </div>
      <span className="text-gray-400 text-sm whitespace-nowrap">{progress}%</span>
    </section>
  )
}