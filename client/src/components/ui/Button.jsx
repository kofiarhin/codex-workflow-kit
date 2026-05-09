export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:bg-[#205f50] active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400",
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
