import { Moon, Sun } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/ui/uiSlice.js";

export function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      className="grid h-10 w-10 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 shadow-sm transition duration-300 hover:border-zinc-300 hover:text-zinc-950 active:translate-y-[1px] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={() => dispatch(toggleTheme())}
    >
      <Icon size={20} weight="bold" />
    </button>
  );
}
