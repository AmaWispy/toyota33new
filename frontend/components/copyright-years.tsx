'use client'

const START_YEAR = 2016

export function copyrightYears(startYear = START_YEAR) {
  const currentYear = new Date().getFullYear()
  return currentYear > startYear ? `${startYear}–${currentYear}` : String(startYear)
}

export function CopyrightYears({ startYear = START_YEAR }: { startYear?: number }) {
  return <>{copyrightYears(startYear)}</>
}
