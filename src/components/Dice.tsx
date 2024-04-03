import { FC } from "react"
import { DiceKind } from "../types/DiceKind"

interface DiceProps {
  kind: DiceKind
  value: number
}

const Dice: FC<DiceProps> = ({ value }) => {
  return (
    <div className="relative flex h-16 w-16 justify-center rounded-xl border-4 border-amber-500 bg-amber-100 text-xl">
      <div className="my-auto text-3xl font-bold">{value}</div>
    </div>
  )
}

export default Dice
