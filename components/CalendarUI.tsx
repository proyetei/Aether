"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarUI() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="mx-auto items-center justify-center">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      styles={{head_cell: {
        width: "30px",
      },}}
    />
    </div>
  )
}
