import {
  BellRinging,
  CheckCircle,
  EnvelopeSimple,
  LockKey,
  Megaphone,
  Pulse,
  WarningCircle
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { useUpdateNotificationPreferences } from "../hooks/mutations/useUpdateNotificationPreferences.js";
import { useNotificationPreferences } from "../hooks/queries/useNotificationPreferences.js";

const defaultPreferences = {
  securityAlerts: true,
  accountActivity: true,
  productUpdates: false,
  workflowSummary: true,
  marketing: false,
  digestFrequency: "weekly"
};

const preferenceRows = [
  {
    key: "securityAlerts",
    title: "Security alerts",
    detail: "Password, session, and account protection notices.",
    icon: LockKey,
    locked: true
  },
  {
    key: "accountActivity",
    title: "Account activity",
    detail: "Sign-ins, profile changes, and organization access updates.",
    icon: Pulse
  },
  {
    key: "workflowSummary",
    title: "Workflow summaries",
    detail: "A concise recap when project workflow documents change.",
    icon: EnvelopeSimple
  },
  {
    key: "productUpdates",
    title: "Product updates",
    detail: "Release notes and improvements that affect your workspace.",
    icon: BellRinging
  },
  {
    key: "marketing",
    title: "Research and offers",
    detail: "Occasional notes about templates, guides, and product news.",
    icon: Megaphone
  }
];

const digestOptions = [
  { value: "instant", label: "Instant" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "off", label: "Off" }
];

export function NotificationPreferencesPage() {
  const preferencesQuery = useNotificationPreferences();
  const updateMutation = useUpdateNotificationPreferences();
  const [form, setForm] = useState(defaultPreferences);

  useEffect(() => {
    if (preferencesQuery.data) {
      setForm({
        ...defaultPreferences,
        ...preferencesQuery.data,
        securityAlerts: true
      });
    }
  }, [preferencesQuery.data]);

  const hasChanges = useMemo(() => {
    if (!preferencesQuery.data) return false;
    const saved = {
      ...defaultPreferences,
      ...preferencesQuery.data,
      securityAlerts: true
    };

    return Object.keys(defaultPreferences).some((key) => form[key] !== saved[key]);
  }, [form, preferencesQuery.data]);

  function togglePreference(key) {
    setForm((current) => ({
      ...current,
      [key]: !current[key]
    }));
  }

  function updateDigestFrequency(event) {
    setForm((current) => ({
      ...current,
      digestFrequency: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateMutation.mutateAsync(form);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-14">
      <div className="animate-rise-in">
        <p className="mb-4 inline-flex rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          Preferences
        </p>
        <h1 className="text-4xl font-semibold leading-none tracking-tighter text-zinc-950 md:text-5xl dark:text-white">
          Notification controls that keep signal high.
        </h1>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Choose which account and product updates should reach your inbox. Security
          notices stay enabled to protect the account.
        </p>
      </div>

      <form
        className="animate-rise-in rounded-lg border border-zinc-200 bg-white p-5 shadow-soft [animation-delay:90ms] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900"
        onSubmit={handleSubmit}
      >
        {preferencesQuery.isLoading && <PreferenceSkeleton />}

        {preferencesQuery.isError && (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
            <div className="flex gap-2">
              <WarningCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Preferences are unavailable.</p>
                <p className="mt-1">{preferencesQuery.error.message}</p>
                <Link
                  to="/login"
                  className="mt-3 inline-flex font-semibold text-rose-900 underline underline-offset-4 dark:text-rose-100"
                >
                  Sign in to manage notifications
                </Link>
              </div>
            </div>
          </div>
        )}

        {preferencesQuery.data && (
          <>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {preferenceRows.map((row) => (
                <PreferenceToggle
                  key={row.key}
                  checked={form[row.key]}
                  disabled={row.locked}
                  onChange={() => togglePreference(row.key)}
                  {...row}
                />
              ))}
            </div>

            <div className="mt-6 grid gap-2">
              <label
                htmlFor="digestFrequency"
                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                Email digest frequency
              </label>
              <select
                id="digestFrequency"
                value={form.digestFrequency}
                onChange={updateDigestFrequency}
                className="min-h-11 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition duration-300 focus:border-accent focus:ring-4 focus:ring-[#256f5c]/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
              >
                {digestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                Applies to summaries and product update emails.
              </p>
            </div>

            {updateMutation.isError && (
              <div className="mt-5 flex gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
                <WarningCircle size={18} className="mt-0.5 shrink-0" />
                <span>{updateMutation.error.message}</span>
              </div>
            )}

            {updateMutation.isSuccess && !hasChanges && (
              <div className="mt-5 flex gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200">
                <CheckCircle size={18} className="mt-0.5 shrink-0" />
                <span>Notification preferences saved.</span>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {hasChanges ? "You have unsaved changes." : "Preferences are up to date."}
              </p>
              <Button
                type="submit"
                disabled={!hasChanges || updateMutation.isPending}
                className="sm:min-w-32"
              >
                {updateMutation.isPending ? "Saving" : "Save changes"}
              </Button>
            </div>
          </>
        )}
      </form>
    </section>
  );
}

function PreferenceToggle({
  checked,
  detail,
  disabled = false,
  icon: Icon,
  onChange,
  title
}) {
  return (
    <div className="grid gap-4 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="flex gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-zinc-100 text-accent dark:bg-zinc-950 dark:text-emerald-400">
          <Icon size={20} />
        </span>
        <div>
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
            {title}
          </p>
          <p className="mt-1 max-w-[56ch] text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {detail}
          </p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className={[
          "relative h-7 w-12 rounded-full border transition duration-300 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70",
          checked
            ? "border-accent bg-accent dark:border-emerald-400 dark:bg-emerald-400"
            : "border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800"
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300",
            checked ? "translate-x-5" : "translate-x-1"
          ].join(" ")}
        />
        <span className="sr-only">{title}</span>
      </button>
    </div>
  );
}

function PreferenceSkeleton() {
  return (
    <div className="grid gap-5" aria-label="Loading notification preferences">
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="grid gap-4 border-b border-zinc-100 pb-5 last:border-b-0 dark:border-zinc-800 sm:grid-cols-[1fr_auto] sm:items-center"
        >
          <div className="flex gap-4">
            <span className="h-10 w-10 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
            <span className="grid flex-1 gap-2">
              <span className="h-4 w-44 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <span className="h-4 w-full max-w-md animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            </span>
          </div>
          <span className="h-7 w-12 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}
