export function TextInput({ label, helperText, error, id, ...props }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {label}
      </label>
      <input
        id={id}
        className={[
          "min-h-11 rounded-md border bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition duration-300 placeholder:text-zinc-400 focus:border-accent focus:ring-4 focus:ring-[#256f5c]/10 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10",
          error
            ? "border-rose-400 dark:border-rose-500"
            : "border-zinc-200 dark:border-zinc-800"
        ].join(" ")}
        aria-invalid={Boolean(error)}
        aria-describedby={helperText || error ? `${id}-hint` : undefined}
        {...props}
      />
      {(helperText || error) && (
        <p
          id={`${id}-hint`}
          className={
            error
              ? "text-sm text-rose-700 dark:text-rose-300"
              : "text-sm text-zinc-500 dark:text-zinc-500"
          }
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
