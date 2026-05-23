import { CheckCircle, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../components/ui/Button.jsx";
import { TextInput } from "../components/ui/TextInput.jsx";
import { useCreateBraidService } from "../hooks/mutations/useCreateBraidService.js";
import { useDeleteBraidService } from "../hooks/mutations/useDeleteBraidService.js";
import { useUpdateBraidService } from "../hooks/mutations/useUpdateBraidService.js";
import { useBraidServices } from "../hooks/queries/useBraidServices.js";

const emptyForm = {
  name: "",
  description: "",
  durationMinutes: "180",
  priceDollars: "220"
};

export function BraidServicesPage() {
  const servicesQuery = useBraidServices();
  const createMutation = useCreateBraidService();
  const updateMutation = useUpdateBraidService();
  const deleteMutation = useDeleteBraidService();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [fieldError, setFieldError] = useState("");

  const services = servicesQuery.data || [];
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const mutationError =
    createMutation.error?.message ||
    updateMutation.error?.message ||
    deleteMutation.error?.message;

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  function startEdit(service) {
    setEditingId(service.id);
    setFieldError("");
    setForm({
      name: service.name,
      description: service.description,
      durationMinutes: String(service.durationMinutes),
      priceDollars: String(service.priceDollars)
    });
  }

  function resetForm() {
    setEditingId(null);
    setFieldError("");
    setForm(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      durationMinutes: Number(form.durationMinutes),
      priceDollars: Number(form.priceDollars),
      isActive: true
    };

    if (!payload.name || !payload.description) {
      setFieldError("Add a service name and description.");
      return;
    }

    if (payload.durationMinutes < 15 || payload.priceDollars < 0) {
      setFieldError("Use a valid duration and price.");
      return;
    }

    setFieldError("");

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      resetForm();
    } catch {
      // React Query exposes the mutation error for the inline alert.
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
      <div className="animate-rise-in">
        <p className="mb-4 inline-flex rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          Service catalog
        </p>
        <h1 className="text-4xl font-semibold leading-none tracking-tighter text-zinc-950 md:text-5xl dark:text-white">
          Braid services
        </h1>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Manage starter catalog records for KareBraids. This page keeps server
          data in TanStack Query and sends every request through the shared API client.
        </p>

        <form
          className="mt-8 grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
              {editingId ? "Edit service" : "Add catalog service"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-600 transition duration-300 hover:bg-zinc-100 active:translate-y-[1px] dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
            )}
          </div>
          <TextInput
            id="service-name"
            name="name"
            label="Service name"
            placeholder="Knotless waist-length braids"
            value={form.name}
            onChange={updateField}
          />
          <TextInput
            id="service-description"
            name="description"
            label="Description"
            placeholder="Low-tension install with wash, parting, and finish."
            value={form.description}
            onChange={updateField}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              id="service-duration"
              name="durationMinutes"
              type="number"
              label="Duration minutes"
              value={form.durationMinutes}
              onChange={updateField}
            />
            <TextInput
              id="service-price"
              name="priceDollars"
              type="number"
              label="Price dollars"
              value={form.priceDollars}
              onChange={updateField}
            />
          </div>
          {fieldError && (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
              {fieldError}
            </p>
          )}
          {mutationError && (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
              {mutationError}
            </p>
          )}
          <Button type="submit" disabled={isSaving}>
            <span className="inline-flex items-center justify-center gap-2">
              <Plus size={18} />
              {editingId ? "Save service" : "Add service"}
            </span>
          </Button>
        </form>
      </div>

      <div className="animate-rise-in grid content-start gap-4 [animation-delay:120ms]">
        {servicesQuery.isLoading && <ServicesSkeleton />}
        {servicesQuery.isError && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
            {servicesQuery.error.message}
          </div>
        )}
        {!servicesQuery.isLoading && !servicesQuery.isError && services.length === 0 && (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CheckCircle size={28} className="mx-auto text-accent dark:text-emerald-400" />
            <p className="mt-4 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
              No braid services yet
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Add the first catalog service to prove the full CRUD loop.
            </p>
          </div>
        )}
        {services.map((service, index) => (
          <article
            key={service.id}
            className="animate-rise-in rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            style={{ animationDelay: `${index * 70 + 180}ms` }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
                  {service.name}
                </h2>
                <p className="mt-2 max-w-[52ch] text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </div>
              <div className="flex gap-2">
                <IconButton label={`Edit ${service.name}`} onClick={() => startEdit(service)}>
                  <PencilSimple size={18} />
                </IconButton>
                <IconButton
                  label={`Delete ${service.name}`}
                  onClick={() => deleteMutation.mutate(service.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash size={18} />
                </IconButton>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <Metric label="Duration" value={`${service.durationMinutes} min`} />
              <Metric label="Price" value={`$${service.priceDollars}`} />
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function IconButton({ children, disabled = false, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-700 shadow-sm transition duration-300 hover:border-zinc-300 hover:bg-zinc-50 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700"
    >
      {children}
    </button>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-lg text-zinc-950 dark:text-zinc-100">{value}</dd>
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <div className="grid gap-4" aria-label="Loading braid services">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800/70" />
          <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800/70" />
        </div>
      ))}
    </div>
  );
}
