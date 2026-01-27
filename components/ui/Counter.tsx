'use client';

import React, { useState } from 'react';
import Button from './Button';

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
}

export default function Counter({
  initialValue = 1,
  min = 1,
  max = 999,
  onValueChange,
}: CounterProps) {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onValueChange?.(newValue);
    }
  };

  const decrement = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onValueChange?.(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        onClick={decrement}
        disabled={value <= min}
        className="w-10 h-10 p-0"
      >
        -
      </Button>
      <span className="w-12 text-center font-semibold">{value}</span>
      <Button
        variant="secondary"
        onClick={increment}
        disabled={value >= max}
        className="w-10 h-10 p-0"
      >
        +
      </Button>
    </div>
  );
}
