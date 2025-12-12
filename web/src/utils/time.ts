// Time and date utility functions

export function blocksToMinutes(blocks: number, blockTimeMinutes = 10): number {
  return blocks * blockTimeMinutes
}

export function blocksToHours(blocks: number, blockTimeMinutes = 10): number {
  return blocksToMinutes(blocks, blockTimeMinutes) / 60
}

export function blocksToDays(blocks: number, blockTimeMinutes = 10): number {
  return blocksToHours(blocks, blockTimeMinutes) / 24
}

export function minutesToBlocks(minutes: number, blockTimeMinutes = 10): number {
  return Math.ceil(minutes / blockTimeMinutes)
}

export function hoursToBlocks(hours: number, blockTimeMinutes = 10): number {
  return minutesToBlocks(hours * 60, blockTimeMinutes)
}

export function daysToBlocks(days: number, blockTimeMinutes = 10): number {
  return hoursToBlocks(days * 24, blockTimeMinutes)
}

export function formatBlockDuration(blocks: number, blockTimeMinutes = 10): string {
  const days = blocksToDays(blocks, blockTimeMinutes)
  const hours = blocksToHours(blocks, blockTimeMinutes)
  const minutes = blocksToMinutes(blocks, blockTimeMinutes)

  if (days >= 1) {
    const wholeDays = Math.floor(days)
    const remainingHours = Math.floor((days - wholeDays) * 24)
    if (remainingHours > 0) {
      return `${wholeDays}d ${remainingHours}h`
    }
    return `${wholeDays} day${wholeDays > 1 ? 's' : ''}`
  }

  if (hours >= 1) {
    const wholeHours = Math.floor(hours)
    const remainingMinutes = Math.floor((hours - wholeHours) * 60)
    if (remainingMinutes > 0) {
      return `${wholeHours}h ${remainingMinutes}m`
    }
    return `${wholeHours} hour${wholeHours > 1 ? 's' : ''}`
  }

  return `${Math.floor(minutes)} minute${Math.floor(minutes) > 1 ? 's' : ''}`
}

export function getBlocksUntil(targetBlock: number, currentBlock: number): number {
  return Math.max(0, targetBlock - currentBlock)
}

export function getTimeUntilBlock(
  targetBlock: number,
  currentBlock: number,
  blockTimeMinutes = 10
): string {
  const blocksRemaining = getBlocksUntil(targetBlock, currentBlock)
  return formatBlockDuration(blocksRemaining, blockTimeMinutes)
}

