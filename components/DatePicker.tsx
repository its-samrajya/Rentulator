"use client";

import { useEffect, useRef } from "react";

import "@sajanm/nepali-date-picker/dist/nepali.datepicker.v5.0.6.min.js";
import "@sajanm/nepali-date-picker/dist/nepali.datepicker.v5.0.6.min.css";

interface NepaliDatepickerProps {
  name: string;
  required?: boolean;
}

function NepaliDatepicker({ name, required = false }: NepaliDatepickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (inputRef.current && !initializedRef.current) {
      // @ts-ignore
      inputRef.current.NepaliDatePicker({
        dateFormat: "YYYY-MM-DD",
        language: "english",
      });

      initializedRef.current = true;
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      name={name}
      id="nepali-datepicker"
      required={required}
      placeholder="Select Nepali Date"
      className="border rounded px-3 py-2"
      autoComplete="off"
    />
  );
}

export default NepaliDatepicker;
