import { WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../components/ui/Button.jsx";
import { TextInput } from "../components/ui/TextInput.jsx";
import { useLogin } from "../hooks/mutations/useLogin.js";
import { setSession } from "../redux/auth/authSlice.js";

export function LoginPage() {
  const dispatch = useDispatch();
  const loginMutation = useLogin();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [fieldErrors, setFieldErrors] = useState({});

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = {};

    if (!form.email.includes("@")) errors.email = "Enter a valid email address.";
    if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const data = await loginMutation.mutateAsync(form);
    dispatch(
      setSession({
        userId: data.user.id,
        displayName: data.user.name,
        activeOrganizationId: null
      })
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
      <div className="animate-rise-in order-2 lg:order-1">
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Session
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tighter text-zinc-950 md:text-5xl">
            Sign in to test the auth route.
          </h1>
          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <TextInput
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText="Use an account created through the register endpoint."
              placeholder="owner@forgeboard.test"
              value={form.email}
              error={fieldErrors.email}
              onChange={updateField}
            />
            <TextInput
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText="Minimum 8 characters."
              value={form.password}
              error={fieldErrors.password}
              onChange={updateField}
            />
            {loginMutation.isError && (
              <div className="flex gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                <WarningCircle size={18} className="mt-0.5 shrink-0" />
                <span>{loginMutation.error.message}</span>
              </div>
            )}
            {loginMutation.isSuccess && (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Signed in as {loginMutation.data.user.name}.
              </div>
            )}
            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Signing in" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>

      <div className="animate-rise-in order-1 grid content-between rounded-lg bg-zinc-950 p-6 text-white shadow-soft lg:order-2 lg:min-h-[520px]">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-emerald-200">
            Secure defaults
          </p>
          <p className="mt-6 max-w-[48ch] text-3xl font-semibold leading-tight tracking-tighter md:text-5xl">
            Auth is wired for cookies, not local API shortcuts.
          </p>
        </div>
        <dl className="mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          <Stat label="Cookie transport" value="HTTP-only" />
          <Stat label="API base" value="VITE_API_URL" />
          <Stat label="Server source" value="Express" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border-t border-white/12 pt-4">
      <dt className="text-sm text-zinc-400">{label}</dt>
      <dd className="mt-1 font-mono text-lg text-white">{value}</dd>
    </div>
  );
}
