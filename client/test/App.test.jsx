import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
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

const braidServicesMocks = vi.hoisted(() => ({
  servicesState: {
    isLoading: false,
    isError: false,
    data: [
      {
        id: "service-1",
        name: "Knotless waist-length braids",
        description: "Low-tension install with wash, parting, and finish.",
        durationMinutes: 300,
        priceDollars: 285,
        isActive: true
      }
    ],
    error: null
  },
  createState: {
    mutateAsync: vi.fn(),
    isPending: false,
    error: null
  },
  updateState: {
    mutateAsync: vi.fn(),
    isPending: false,
    error: null
  },
  deleteState: {
    mutate: vi.fn(),
    isPending: false,
    error: null
  }
}));

vi.mock("../src/hooks/queries/useBraidServices.js", () => ({
  useBraidServices: () => braidServicesMocks.servicesState
}));

vi.mock("../src/hooks/mutations/useCreateBraidService.js", () => ({
  useCreateBraidService: () => braidServicesMocks.createState
}));

vi.mock("../src/hooks/mutations/useUpdateBraidService.js", () => ({
  useUpdateBraidService: () => braidServicesMocks.updateState
}));

vi.mock("../src/hooks/mutations/useDeleteBraidService.js", () => ({
  useDeleteBraidService: () => braidServicesMocks.deleteState
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
    braidServicesMocks.servicesState = {
      isLoading: false,
      isError: false,
      data: [
        {
          id: "service-1",
          name: "Knotless waist-length braids",
          description: "Low-tension install with wash, parting, and finish.",
          durationMinutes: 300,
          priceDollars: 285,
          isActive: true
        }
      ],
      error: null
    };
    braidServicesMocks.createState.mutateAsync.mockReset();
    braidServicesMocks.createState.mutateAsync.mockResolvedValue({});
    braidServicesMocks.createState.isPending = false;
    braidServicesMocks.createState.error = null;
    braidServicesMocks.updateState.mutateAsync.mockReset();
    braidServicesMocks.updateState.isPending = false;
    braidServicesMocks.updateState.error = null;
    braidServicesMocks.deleteState.mutate.mockReset();
    braidServicesMocks.deleteState.isPending = false;
    braidServicesMocks.deleteState.error = null;
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

    expect(screen.getByText("KareBraids")).toBeInTheDocument();
    expect(screen.getByText(/braid studio operations/i)).toBeInTheDocument();
  });

  it("renders the braid services starter route", () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={["/services"]}>
          <App />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByRole("heading", { name: /braid services/i })).toBeInTheDocument();
    expect(screen.getByText("Knotless waist-length braids")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add service/i })).toBeInTheDocument();
  });

  it("submits a new braid service through the create mutation", async () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={["/services"]}>
          <App />
        </MemoryRouter>
      </AppProviders>
    );

    fireEvent.change(screen.getByLabelText("Service name"), {
      target: { value: "Boho bob braids" }
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Shoulder-grazing bob with loose textured ends." }
    });
    fireEvent.change(screen.getByLabelText("Duration minutes"), {
      target: { value: "210" }
    });
    fireEvent.change(screen.getByLabelText("Price dollars"), {
      target: { value: "195" }
    });
    fireEvent.click(screen.getByRole("button", { name: /add service/i }));

    await waitFor(() => {
      expect(braidServicesMocks.createState.mutateAsync).toHaveBeenCalledWith({
        name: "Boho bob braids",
        description: "Shoulder-grazing bob with loose textured ends.",
        durationMinutes: 210,
        priceDollars: 195,
        isActive: true
      });
    });
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
