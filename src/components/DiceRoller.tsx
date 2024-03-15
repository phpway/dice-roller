import { useEffect, useState } from "react"
import Dice from "./Dice"

export enum DiceKind {
  D4 = 4,
  D6 = 6,
  D8 = 8,
  D10 = 10,
  D12 = 12,
  D20 = 20,
}

// list of dice described by number of sides,
const INITIAL_DICE_POOL = [DiceKind.D6]

const DiceRoller = () => {
  const [dicePool, setDicePool] = useState<DiceKind[]>(INITIAL_DICE_POOL)
  const [diceRoll, setDiceRoll] = useState<number[]>([])

  const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max) + 1
  }

  const handleRoll = () => {
    const roll = []
    for (let i = 0; i < dicePool.length; i++) {
      roll.push(getRandomInt(dicePool[i]))
    }
    setDiceRoll(roll)
  }

  const handleAddDice = (dice: DiceKind) => {
    const newDicePool = [...dicePool, dice].sort((x, y) => x - y)
    setDicePool(newDicePool)
  }

  const handleReset = () => {
    setDicePool(INITIAL_DICE_POOL)
  }

  useEffect(() => {
    handleRoll()
  }, [dicePool])

  return (
    <div className="flex-column gap-2">
      <div className="my-5 flex justify-center gap-3 border border-gray-200 p-3">
        {diceRoll.map((value, index) => (
          <Dice key={index} kind={dicePool[index]} value={value} />
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <button
          className="rounded-lg border-2 border-slate-500 bg-slate-200 p-4 hover:bg-slate-300"
          onClick={handleReset}
        >
          RESET
        </button>
        <button
          className="rounded-lg border-2 border-indigo-500 bg-indigo-200 p-4 hover:bg-indigo-300"
          onClick={() => handleAddDice(DiceKind.D6)}
        >
          +D6
        </button>
        <button
          className="rounded-lg border-2 border-indigo-500 bg-indigo-200 p-4 hover:bg-indigo-300"
          onClick={() => handleAddDice(DiceKind.D12)}
        >
          +D12
        </button>

        <button
          className="rounded-lg border-2 border-indigo-500 bg-indigo-200 p-4 hover:bg-indigo-300"
          onClick={handleRoll}
        >
          ROLL
        </button>
      </div>
    </div>
  )
}

export default DiceRoller
