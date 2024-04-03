import { useEffect, useState } from "react"
import Dice from "./Dice"
import { DiceKind } from "../types/DiceKind"
import { Button } from "./ui/Button"

const INITIAL_DICE_POOL: DiceKind[] = []

const DiceRoller = () => {
  const [dicePool, setDicePool] = useState<DiceKind[]>(INITIAL_DICE_POOL)
  const [diceRoll, setDiceRoll] = useState<number[]>([])

  const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max) + 1
  }

  const replacePool = (newPool?: DiceKind[]) => {
    // sort by dice kind
    const pool = (newPool ?? [...dicePool]).sort((x, y) => x - y)
    setDicePool(pool)
  }

  const handleRoll = () => {
    const roll = []
    for (let i = 0; i < dicePool.length; i++) {
      roll.push(getRandomInt(dicePool[i]))
    }
    setDiceRoll(roll)
  }

  const handleAddDice = (dice: DiceKind) => {
    replacePool([...dicePool, dice])
  }

  const handleReset = () => {
    replacePool(INITIAL_DICE_POOL)
  }

  const getSum = (values: number[]): number =>
    values.reduce((acc, val) => acc + val, 0)

  const getAvg = (values: number[], decimals: number = 1): string =>
    (getSum(values) / values.length).toFixed(decimals)

  // roll the dice anytime dice pool changes
  useEffect(() => {
    handleRoll()
  }, [dicePool])

  const renderStats = (values: number[]) => {
    if (values.length < 2) {
      return null
    }
    return (
      <div className="ml-2 flex flex-col justify-evenly border-l border-gray-300 pl-3">
        <div className="font-mono font-bold text-zinc-500">
          SUM: {getSum(values)}
        </div>
        <div className="font-mono font-bold text-zinc-500">
          AVG: {getAvg(values)}
        </div>
      </div>
    )
  }

  // divide dice into groups by kind
  interface Group {
    kind: DiceKind
    values: number[]
  }
  const groups: Group[] = []
  let values: number[] = []
  dicePool.map((kind, index) => {
    const nextKind = dicePool[index + 1]
    values.push(diceRoll[index])
    if (kind !== nextKind) {
      groups.push({ kind, values })
      values = []
    }
  })

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end gap-3">
        {groups.length > 0 && (
          <Button onClick={handleReset} variant="secondary">
            RESET
          </Button>
        )}
        <Button onClick={() => handleAddDice(DiceKind.D4)}>+D4</Button>
        <Button onClick={() => handleAddDice(DiceKind.D6)}>+D6</Button>
        <Button onClick={() => handleAddDice(DiceKind.D8)}>+D8</Button>
        <Button onClick={() => handleAddDice(DiceKind.D10)}>+D10</Button>
        <Button onClick={() => handleAddDice(DiceKind.D12)}>+D12</Button>
        <Button onClick={() => handleAddDice(DiceKind.D20)}>+D20</Button>
      </div>

      <div className="my-5 flex flex-wrap justify-center gap-5 rounded-md border-2 border-indigo-800 bg-indigo-100 p-4">
        {groups.length === 0 && (
          <div className="text-2xl font-semibold text-slate-500">
            Add some dice...
          </div>
        )}
        {groups.map((group) => (
          <div
            className="relative flex gap-2 rounded-md border-2 border-slate-400 bg-gray-50 p-4"
            key={group.kind}
          >
            <div className="absolute -end-2 -top-3 inline-flex h-6 items-center justify-center rounded-full border-2 border-white bg-slate-200 px-1 text-xs font-bold text-slate-600 dark:border-slate-400">
              {`${group.values.length}xD${group.kind}`}
            </div>
            {group.values.map((value, index) => (
              <Dice key={index} kind={group.kind} value={value} />
            ))}
            {renderStats(group.values)}
          </div>
        ))}
      </div>

      {groups.length > 0 && (
        <div className="flex items-center justify-end gap-3">
          <Button onClick={handleRoll} className="px-10 py-8">
            ROLL
          </Button>
        </div>
      )}
    </div>
  )
}

export default DiceRoller
