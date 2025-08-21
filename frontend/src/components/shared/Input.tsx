import type { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: AuthInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none text-foreground"
      />
    </div>
  );
}
