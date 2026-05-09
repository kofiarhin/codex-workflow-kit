import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { App } from "../src/App.jsx";
import { AppProviders } from "../src/redux/providers.jsx";

vi.mock("../src/hooks/queries/useHealth.js", () => ({
  useHealth: () => ({
    isLoading: false,
    isError: false,
    data: { status: "ok", service: "api" }
  })
}));

describe("App", () => {
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
});
