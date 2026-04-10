"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { addMonths, format, startOfYear, isBefore, isAfter, isSameDay } from "date-fns"

interface DateRange {
  from?: Date
  to?: Date
}

interface CalendarTwinProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  onComplete?: () => void // Called when both dates are selected
  className?: string
  yearRange?: [number, number]
  disabledDates?: Date[] // Dates that cannot be selected
  minDate?: Date // Minimum selectable date
  getPriceForDate?: (date: Date) => number | null // Nightly price lookup
  getMinStayForDate?: (date: Date) => number | null // Minimum stay lookup
  weeklyDiscount?: number | null // e.g. 0.9 = 10% off for 7+ nights
}

export function CalendarTwin({
  value,
  onChange,
  onComplete,
  className,
  yearRange = [2000, 2035],
  disabledDates = [],
  minDate = new Date(),
  getPriceForDate,
  getMinStayForDate,
  weeklyDiscount,
}: CalendarTwinProps) {
  const [view, setView] = React.useState<"month" | "year">("month")
  const [current, setCurrent] = React.useState<Date>(value?.from ?? new Date())
  const [selectionState, setSelectionState] = React.useState<"from" | "to">(
    value?.from && !value?.to ? "to" : "from"
  )

  // Check if a date is occupied (in disabledDates)
  const isDayOccupied = React.useCallback((date: Date): boolean => {
    return disabledDates.some((disabled) => isSameDay(date, disabled))
  }, [disabledDates])

  // Find the first occupied date after the selected start date
  // This limits the range so users can't book *across* an existing reservation
  const rangeLimitDate = React.useMemo(() => {
    if (!value?.from) return null
    let closest: Date | null = null
    for (const d of disabledDates) {
      if (isAfter(d, value.from)) {
        if (!closest || isBefore(d, closest)) {
          closest = d
        }
      }
    }
    return closest
  }, [disabledDates, value?.from])

  // Determine if a date can be selected based on current state
  const isDateSelectable = React.useCallback((date: Date): boolean => {
    // Min date check
    const minDateStart = new Date(minDate)
    minDateStart.setHours(0, 0, 0, 0)
    if (isBefore(date, minDateStart)) return false

    // If selecting start date (from)
    if (selectionState === "from") {
      // Cannot start on an occupied day
      return !isDayOccupied(date)
    }

    // If selecting end date (to)
    if (selectionState === "to" && value?.from) {
      // If date is before start, we are effectively picking a new start
      if (isBefore(date, value.from)) {
        return !isDayOccupied(date)
      }

      // If date is same as start, disable (min 1 night)
      if (isSameDay(date, value.from)) return false

      // If date is after range limit (spanning across reservation), disable
      // But allow the limit date itself (Checkout on reserved day allowed)
      if (rangeLimitDate && isAfter(date, rangeLimitDate)) {
        return false
      }

      return true
    }

    return !isDayOccupied(date)
  }, [minDate, selectionState, value?.from, isDayOccupied, rangeLimitDate])

  const isInRange = React.useCallback((date: Date): boolean => {
    if (!value?.from || !value?.to) return false
    return isAfter(date, value.from) && isBefore(date, value.to)
  }, [value])

  const handleSelect = (date: Date) => {
    if (!isDateSelectable(date)) return

    if (selectionState === "from") {
      // Selecting start date
      onChange?.({ from: date, to: undefined })
      setSelectionState("to")
    } else {
      // Selecting end date
      if (value?.from && isBefore(date, value.from)) {
        // If selecting a date before the start, make it the new start
        onChange?.({ from: date, to: undefined })
        setSelectionState("to")
      } else {
        // Valid end date selection
        onChange?.({ from: value?.from, to: date })
        setSelectionState("from")
        onComplete?.()
      }
    }
  }

  const goPrev = () => {
    if (view === "month") setCurrent(addMonths(current, -1))
    if (view === "year") {
      const prev = new Date(current)
      prev.setFullYear(prev.getFullYear() - 12)
      setCurrent(prev)
    }
  }

  const goNext = () => {
    if (view === "month") setCurrent(addMonths(current, 1))
    if (view === "year") {
      const next = new Date(current)
      next.setFullYear(next.getFullYear() + 12)
      setCurrent(next)
    }
  }

  const renderMonth = (month: Date) => {
    const start = new Date(month.getFullYear(), month.getMonth(), 1)
    const end = new Date(month.getFullYear(), month.getMonth() + 1, 0)
    const days: Date[] = []
    for (let i = 1; i <= end.getDate(); i++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), i))
    }

    return (
      <div className="w-full min-w-[252px]">
        <div className="mb-2 text-center text-sm font-medium">
          {format(month, "MMMM yyyy")}
        </div>
        <div className="grid grid-cols-7 text-xs text-muted-foreground">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="h-6 sm:h-7 flex items-center justify-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: start.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className={getPriceForDate ? "h-12 sm:h-14" : "h-8 sm:h-9"} />
          ))}
          {days.map((day) => {
            const isSelected =
              (value?.from && isSameDay(day, value.from)) ||
              (value?.to && isSameDay(day, value.to))
            const isRangeStart = value?.from && isSameDay(day, value.from)
            const isRangeEnd = value?.to && isSameDay(day, value.to)
            const inRange = isInRange(day)

            // Check formatted disabled state
            const selectable = isDateSelectable(day)
            const disabled = !selectable

            // Visual check for occupied days (even if selectable as checkout)
            const occupied = isDayOccupied(day)

            // Price for this date
            const price = getPriceForDate?.(day) ?? null
            const minStay = getMinStayForDate?.(day) ?? null
            const showPrice = price !== null && !disabled && !occupied

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleSelect(day)}
                disabled={disabled}
                title={minStay && minStay > 1 ? `${minStay}-night minimum` : undefined}
                className={cn(
                  "relative m-0.5 flex flex-col items-center justify-center rounded-md transition-colors touch-manipulation",
                  getPriceForDate ? "h-12 w-9 sm:h-14 sm:w-10" : "h-8 w-8 sm:h-9 sm:w-9",
                  disabled && "text-muted-foreground/50 line-through cursor-not-allowed",
                  !disabled && !isSelected && !inRange && "hover:bg-accent hover:text-foreground active:bg-accent",
                  !disabled && occupied && !isSelected && "bg-stripes-gray text-muted-foreground",
                  isSelected && "bg-primary text-primary-foreground",
                  inRange && !isSelected && "bg-primary/20 text-foreground",
                  isRangeStart && value?.to && "rounded-r-none",
                  isRangeEnd && value?.from && "rounded-l-none",
                  inRange && "rounded-none"
                )}
              >
                <span className="text-xs sm:text-sm leading-none">{day.getDate()}</span>
                {showPrice && (
                  <span className={cn(
                    "text-[9px] sm:text-[10px] leading-none mt-0.5 font-medium",
                    isSelected ? "text-primary-foreground/80" : "text-emerald-600 dark:text-emerald-400"
                  )}>
                    ${price}
                  </span>
                )}
                {disabled && occupied && price !== null && (
                  <span className="text-[9px] sm:text-[10px] leading-none mt-0.5 text-muted-foreground/40">
                    —
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderYearGrid = () => {
    const currentYear = current.getFullYear()
    const start = Math.max(yearRange[0], currentYear - (currentYear % 12))
    const years = Array.from({ length: 12 }, (_, i) => start + i)

    return (
      <div className="p-2">
        <div className="grid grid-cols-3 gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                const newDate = startOfYear(current)
                newDate.setFullYear(y)
                setCurrent(newDate)
                setView("month")
              }}
              className={cn(
                "h-10 rounded-md text-sm font-medium transition-colors touch-manipulation",
                y === currentYear
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-foreground active:bg-accent"
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-2 sm:p-3 w-full max-w-[calc(100vw-2rem)] sm:w-auto sm:max-w-none overflow-x-auto",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={goPrev}
          className="h-8 w-8 flex-shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <button
          onClick={() => setView(view === "month" ? "year" : "month")}
          className="text-sm font-semibold hover:underline truncate px-2"
        >
          {view === "month"
            ? format(current, "MMMM yyyy")
            : `${current.getFullYear()}`}
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={goNext}
          className="h-8 w-8 flex-shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Selection hint */}
      <div className="text-center text-xs text-muted-foreground mb-2">
        {selectionState === "from" ? "Select check-in date" : "Select check-out date"}
      </div>

      {view === "month" ? (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {renderMonth(current)}
          {renderMonth(addMonths(current, 1))}
        </div>
      ) : (
        renderYearGrid()
      )}

      {/* Legend & discount info */}
      {getPriceForDate && view === "month" && (
        <div className="mt-3 pt-3 border-t border-border flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-medium text-emerald-600 dark:text-emerald-400">$123</span> = nightly rate
          </span>
          <span className="flex items-center gap-1">
            <span className="line-through">15</span> = unavailable
          </span>
          {weeklyDiscount && weeklyDiscount < 1 && (
            <span className="ml-auto bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
              {Math.round((1 - weeklyDiscount) * 100)}% off 7+ nights
            </span>
          )}
        </div>
      )}
    </div>
  )
}
