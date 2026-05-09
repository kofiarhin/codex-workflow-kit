import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../src/App.jsx";
import { clearSession, setSession } from "../src/redux/auth/authSlice.js";
import { AppProviders } from "../src/redux/providers.jsx";
import { store } from "../src/redux/store.js";
import { dismissToast, showToast } from "../src/redux/ui/uiSlice.js";

vi.mock("../src/hooks/queries/useHealth.js", () => ({
  useHealth: () => ({
    isLoading: false,
    isError: false,
    data: { status: "ok", service: "api" }
  })
}));

describe("App", () => {
  afterEach(() => {
    cleanup();
    store.dispatch(clearSession());
    store.dispatch(dismissToast());
    vi.useRealTimers();
  });

  it("renders the dashboard shell", () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText("Forgeboard")).toBeInTheDocument();
    expect(screen.getByText(/full-stack base/i)).toBeInTheDocument();
  });

  it("renders dashboard session notifications", () => {
    vi.useFakeTimers();
    store.dispatch(
      setSession({
        userId: "user_47",
        displayName: "Mara Voss",
        activeOrganizationId: null
      })
    );
    store.dispatch(showToast({ message: "Signed in as Mara Voss." }));

    render(
      <AppProviders>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByRole("status")).toHaveTextContent("Signed in as Mara Voss.");
    expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
