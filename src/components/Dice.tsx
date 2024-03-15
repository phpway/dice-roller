import { FC } from "react"
import { DiceKind } from "./DiceRoller"

interface DiceProps {
  kind: DiceKind
  value: number
}

const Dice: FC<DiceProps> = ({ kind, value }) => {
  return (
    <div className="relative flex h-16 w-16 justify-center rounded-xl border-4 text-xl">
      <div className="my-auto text-3xl font-bold">{value}</div>
      <div className="absolute -end-2 -top-3 inline-flex h-6 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-bold text-slate-600 dark:border-gray-400">
        {`D${kind}`}
      </div>
    </div>
  )
}

export default Dice
