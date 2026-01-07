/**
 * Time conversion and block duration utility functions.
 */

/**
 * Converts block count to estimated minutes.
 * @param blocks Number of blocks.
 * @param blockTimeMinutes Average time per block in minutes (default 10).
 * @returns Estimated minutes.
 */
export function blocksToMinutes(blocks: number, blockTimeMinutes = 10): number {
  return blocks * blockTimeMinutes
}

/**
 * Converts block count to estimated hours.
 * @param blocks Number of blocks.
 * @param blockTimeMinutes Average time per block in minutes.
 * @returns Estimated hours.
 */
export function blocksToHours(blocks: number, blockTimeMinutes = 10): number {
  return blocksToMinutes(blocks, blockTimeMinutes) / 60
}

/**
 * Converts block count to estimated days.
 * @param blocks Number of blocks.
 * @param blockTimeMinutes Average time per block in minutes.
 * @returns Estimated days.
 */
export function blocksToDays(blocks: number, blockTimeMinutes = 10): number {
  return blocksToHours(blocks, blockTimeMinutes) / 24
}

/**
 * Converts minutes to estimated block count.
 * @param minutes Number of minutes.
 * @param blockTimeMinutes Average time per block in minutes.
 * @returns Estimated number of blocks (rounded up).
 */
export function minutesToBlocks(minutes: number, blockTimeMinutes = 10): number {
  return Math.ceil(minutes / blockTimeMinutes)
}

/**
 * Converts hours to estimated block count.
 * @param hours Number of hours.
 * @param blockTimeMinutes Average time per block in minutes.
 * @returns Estimated number of blocks.
 */
export function hoursToBlocks(hours: number, blockTimeMinutes = 10): number {
  return minutesToBlocks(hours * 60, blockTimeMinutes)
}

/**
 * Converts days to estimated block count.
 * @param days Number of days.
 * @param blockTimeMinutes Average time per block in minutes.
 * @returns Estimated number of blocks.
 */
export function daysToBlocks(days: number, blockTimeMinutes = 10): number {
  return hoursToBlocks(days * 24, blockTimeMinutes)
}

/**
 * Formats a block count as a readable duration (e.g., '2d 4h' or '30 minutes').
 * @param blocks Number of blocks.
 * @param blockTimeMinutes Average time per block in minutes.
 * @returns Human-readable duration string.
 */
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

/**
 * Calculates the number of blocks until a target height.
 * @param targetBlock The target block height.
 * @param currentBlock The current block height.
 * @returns Number of blocks remaining (minimum 0).
 */
export function getBlocksUntil(targetBlock: number, currentBlock: number): number {
  return Math.max(0, targetBlock - currentBlock)
}

/**
 * Estimates the time duration until a target block height is reached.
 * @param targetBlock The target block height.
 * @param currentBlock The current block height.
 * @param blockTimeMinutes Average time per block in minutes.
 * @returns Formatted duration string.
 */
export function getTimeUntilBlock(
  targetBlock: number,
  currentBlock: number,
  blockTimeMinutes = 10
): string {
  const blocksRemaining = getBlocksUntil(targetBlock, currentBlock)
  return formatBlockDuration(blocksRemaining, blockTimeMinutes)
}
