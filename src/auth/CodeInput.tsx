import { useState, useEffect } from "react";

export function CodeInput({ length = 5 }: { length?: number }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    
    // Auto-focus next input
    if (value && index < length - 1) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Update the hidden input with the combined code
  useEffect(() => {
    const code = values.join("");
    const hiddenInput = document.getElementById("code-hidden");
    if (hiddenInput) {
      (hiddenInput as HTMLInputElement).value = code;
    }
  }, [values]);

  return (
    <div data-otp-input className="relative z-50 bg-white p-2 rounded-lg">
      <input
        id="code-hidden"
        name="code"
        type="hidden"
        value={values.join("")}
      />
      <div className="flex gap-2 justify-center">
        {Array(length)
          .fill(null)
          .map((_, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-primary rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/30 bg-white text-foreground"
              style={{ zIndex: 100 + index }}
            />
          ))}
      </div>
    </div>
  );
}
