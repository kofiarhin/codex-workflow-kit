export function TextInput({ label, helperText, error, id, ...props }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800">
        {label}
      </label>
      <input
        id={id}
        className={[
          "min-h-11 rounded-md border bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition duration-300 placeholder:text-zinc-400 focus:border-accent focus:ring-4 focus:ring-[#256f5c]/10",
          error ? "border-rose-400" : "border-zinc-200"
        ].join(" ")}
        aria-invalid={Boolean(error)}
        aria-describedby={helperText || error ? `${id}-hint` : undefined}
        {...props}
      />
      {(helperText || error) && (
        <p
          id={`${id}-hint`}
          className={error ? "text-sm text-rose-700" : "text-sm text-zinc-500"}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
