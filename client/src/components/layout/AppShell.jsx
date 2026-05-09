import { List, Sparkle } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";
import { APP_NAME, NAV_ITEMS } from "../../constants/constans.js";
import { ThemeToggle } from "../ui/ThemeToggle.jsx";

export function AppShell() {
  return (
    <div className="min-h-[100dvh] bg-[#f8faf7] text-ink transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200/80 bg-[#f8faf7]/92 backdrop-blur transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white shadow-soft dark:bg-white dark:text-zinc-950">
              <Sparkle size={18} weight="fill" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-800 dark:text-zinc-100">
              {APP_NAME}
            </span>
          </NavLink>
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 sm:flex">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "rounded-md px-3 py-2 text-sm font-medium transition duration-300 active:translate-y-[1px]",
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                        : "text-zinc-600 hover:bg-white hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
            <button
              className="grid h-10 w-10 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 shadow-sm transition duration-300 active:translate-y-[1px] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 sm:hidden"
              aria-label="Open navigation"
              type="button"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
