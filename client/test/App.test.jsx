import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../src/App.jsx";
import { clearSession, setSession } from "../src/redux/auth/authSlice.js";
import { AppProviders } from "../src/redux/providers.jsx";
import { store } from "../src/redux/store.js";
import { dismissToast, showToast } from "../src/redux/ui/uiSlice.js";

const dashboardMocks = vi.hoisted(() => ({
  healthState: {
    isLoading: false,
    isError: false,
    data: { status: "ok", service: "api" },
    error: null
  }
}));

vi.mock("../src/hooks/queries/useHealth.js", () => ({
  useHealth: () => dashboardMocks.healthState
}));

const profileMocks = vi.hoisted(() => ({
  currentUserState: {
    isLoading: false,
    isError: false,
    data: null,
    error: null
  },
  updateProfileState: {
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
    isSuccess: false,
    error: null
  }
}));

vi.mock("../src/hooks/queries/useCurrentUser.js", () => ({
  useCurrentUser: () => profileMocks.currentUserState
}));

vi.mock("../src/hooks/mutations/useUpdateProfile.js", () => ({
  useUpdateProfile: () => profileMocks.updateProfileState
}));

describe("App", () => {
  afterEach(() => {
    cleanup();
    store.dispatch(clearSession());
    store.dispatch(dismissToast());
    dashboardMocks.healthState = {
      isLoading: false,
      isError: false,
      data: { status: "ok", service: "api" },
      error: null
    };
    profileMocks.currentUserState = {
      isLoading: false,
      isError: false,
      data: null,
      error: null
    };
    profileMocks.updateProfileState.mutateAsync.mockReset();
    profileMocks.updateProfileState.isPending = false;
    profileMocks.updateProfileState.isError = false;
    profileMocks.updateProfileState.isSuccess = false;
    profileMocks.updateProfileState.error = null;
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

  it("renders the dashboard empty state when a card has no data", () => {
    dashboardMocks.healthState = {
      isLoading: false,
      isError: false,
      data: null,
      error: null
    };

    render(
      <AppProviders>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText("No data to display yet.")).toBeInTheDocument();
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

  it("renders the session avatar in the header", () => {
    store.dispatch(
      setSession({
        userId: "user_47",
        displayName: "Mara Voss",
        avatarUrl: "https://cdn.example.test/mara-voss.webp",
        activeOrganizationId: null
      })
    );

    render(
      <AppProviders>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByAltText("Mara Voss avatar")).toHaveAttribute(
      "src",
      "https://cdn.example.test/mara-voss.webp"
    );
  });

  it("validates avatar URLs on the profile page", () => {
    profileMocks.currentUserState = {
      isLoading: false,
      isError: false,
      data: {
        user: {
          id: "user_47",
          name: "Mara Voss",
          avatarUrl: ""
        }
      },
      error: null
    };

    render(
      <AppProviders>
        <MemoryRouter initialEntries={["/profile"]}>
          <App />
        </MemoryRouter>
      </AppProviders>
    );

    fireEvent.change(screen.getByLabelText("Avatar URL"), {
      target: { value: "https://cdn.example.test/avatar.gif" }
    });
    fireEvent.click(screen.getByRole("button", { name: /save avatar/i }));

    expect(
      screen.getByText("Enter an http(s) JPG, PNG, or WebP image URL.")
    ).toBeInTheDocument();
    expect(profileMocks.updateProfileState.mutateAsync).not.toHaveBeenCalled();
  });
});
