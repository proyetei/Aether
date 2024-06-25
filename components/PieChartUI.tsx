import React, { useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { dummyCalendarMoodData } from '@/lib/calendarMoodData';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function PieChartUI() {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [selectedMonth, setSelectedMonth] = React.useState<string>('');
    const [month, setMonth] = useState<string>('January');
    const [data, setData] = useState<{ mood: string; count: number }[]>(dummyCalendarMoodData['January']);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (dummyCalendarMoodData[month]) {
            setData(dummyCalendarMoodData[month]);
        } else {
            alert('Invalid month');
        }
    };

    const pieChartData = data.map(item => ({ id: item.mood, value: item.count }));

    const handleMonthChange = (value: string) => {
      setSelectedMonth(value);
    };

    return (
        <div className='p-4'>
          <div className='gap-4'>
          <form onSubmit={handleFormSubmit}>
            <div className='flex flex-row gap-4 items-center justify-start text-slate-900'>
            <label className='text-slate-100'>
                    Enter month:
                </label>
                <Select onValueChange={handleMonthChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue className="text-slate-900" placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={index} value={month}>{month}</SelectItem>
          ))}
        </SelectContent>
      </Select>
                <Button type="submit" variant="secondary" size="sm">Submit</Button>
            </div>
            </form>
          </div>
            <PieChart
                series={[
                    {
                        arcLabel: (params) => `${params.data.id} (${params.data.value})`,
                        arcLabelMinAngle: 45,
                        data: pieChartData,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: 'bold',
                    },
                }}
                width={400} // Define the size of the chart
                height={400}
            />
        </div>
    );
}

