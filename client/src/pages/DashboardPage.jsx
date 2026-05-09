import {
  ArrowRight,
  ChartLineUp,
  CheckCircle,
  Database,
  ShieldCheck,
  SignOut,
  TerminalWindow
} from "@phosphor-icons/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/mutations/useLogout.js";
import { useHealth } from "../hooks/queries/useHealth.js";
import { clearSession } from "../redux/auth/authSlice.js";
import { dismissToast, showToast } from "../redux/ui/uiSlice.js";

const stackItems = [
  {
    title: "React client",
    detail: "Vite, Router, Redux Toolkit, TanStack Query",
    icon: ChartLineUp
  },
  {
    title: "Express API",
    detail: "Flat server structure with controllers and routes",
    icon: TerminalWindow
  },
  {
    title: "Mongo models",
    detail: "Mongoose schemas with safe public serialization",
    icon: Database
  },
  {
    title: "Auth baseline",
    detail: "HTTP-only cookie token and protected route middleware",
    icon: ShieldCheck
  }
];

export function DashboardPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const health = useHealth();
  const logoutMutation = useLogout();

  async function handleLogout() {
    try {
      await logoutMutation.mutateAsync();
      dispatch(clearSession());
      dispatch(showToast({ message: "Signed out successfully." }));
    } catch {
      // React Query stores the error for the inline dashboard alert.
    }
  }

  return (
    <section className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-16">
      <DashboardToast />
      <div className="animate-rise-in">
        <p className="mb-5 inline-flex rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          MERN starter
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-none tracking-tighter text-zinc-950 md:text-6xl dark:text-white">
          A clean full-stack base for shipping product code.
        </h1>
        <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          The boilerplate keeps server state in TanStack Query, app preferences in
          Redux, API calls in services, and backend responsibilities inside a flat
          Express structure.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:bg-zinc-800 active:translate-y-[1px] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Open auth flow
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://vitejs.dev/"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition duration-300 hover:border-zinc-300 hover:bg-zinc-50 active:translate-y-[1px] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Vite docs
          </a>
          {auth.userId && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition duration-300 hover:border-zinc-300 hover:bg-zinc-50 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <SignOut size={18} />
              {logoutMutation.isPending ? "Signing out" : "Sign out"}
            </button>
          )}
        </div>
        {auth.userId && logoutMutation.isError && (
          <p className="mt-3 max-w-[42ch] rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
            {logoutMutation.error.message}
          </p>
        )}
      </div>

      <aside className="animate-rise-in rounded-lg border border-zinc-200 bg-white p-5 shadow-soft [animation-delay:120ms] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div>
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">API status</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">Live backend health check</p>
          </div>
          <span className="flex h-3 w-3 rounded-full bg-accent animate-soft-pulse dark:bg-emerald-400" />
        </div>
        <div className="mt-5 rounded-md bg-zinc-950 p-4 font-mono text-sm text-zinc-100 dark:bg-zinc-950/80">
          {health.isLoading && <SkeletonLines />}
          {health.isError && (
            <p className="text-rose-200">Error: {health.error.message}</p>
          )}
          {health.data && (
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(health.data, null, 2)}
            </pre>
          )}
        </div>
      </aside>

      <div className="grid gap-4 lg:col-span-2 lg:grid-cols-[1fr_1.25fr_0.9fr]">
        {stackItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="animate-rise-in rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              style={{ animationDelay: `${index * 80 + 180}ms` }}
            >
              <Icon size={24} className="text-accent dark:text-emerald-400" />
              <h2 className="mt-5 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DashboardToast() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => {
      dispatch(dismissToast(notification.id));
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [dispatch, notification]);

  if (!notification) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-20 w-[calc(100vw-2rem)] max-w-sm sm:right-6 lg:right-8">
      <div
        className="animate-rise-in flex items-start gap-3 rounded-md border border-emerald-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-soft dark:border-emerald-900/70 dark:bg-zinc-900 dark:text-zinc-100"
        role="status"
        aria-live="polite"
      >
        <CheckCircle
          size={20}
          weight="fill"
          className="mt-0.5 shrink-0 text-accent dark:text-emerald-400"
        />
        <p className="font-medium leading-6">{notification.message}</p>
      </div>
    </div>
  );
}

function SkeletonLines() {
  return (
    <div className="grid gap-3" aria-label="Loading API status">
      <span className="h-4 w-2/3 animate-pulse rounded bg-white/14" />
      <span className="h-4 w-full animate-pulse rounded bg-white/10" />
      <span className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
    </div>
  );
}
