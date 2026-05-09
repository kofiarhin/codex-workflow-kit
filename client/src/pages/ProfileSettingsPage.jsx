import { CheckCircle, ImageSquare, WarningCircle } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { TextInput } from "../components/ui/TextInput.jsx";
import { AvatarPreview } from "../components/ui/AvatarPreview.jsx";
import { useUpdateProfile } from "../hooks/mutations/useUpdateProfile.js";
import { useCurrentUser } from "../hooks/queries/useCurrentUser.js";
import { setSession } from "../redux/auth/authSlice.js";

const imageUrlPattern = /^https?:\/\/.+\.(jpe?g|png|webp)(?:[?#].*)?$/i;

export function ProfileSettingsPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUserQuery = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();
  const user = currentUserQuery.data?.user;
  const displayName = user?.name || auth.displayName || "User";
  const savedAvatarUrl = user?.avatarUrl || auth.avatarUrl || "";
  const [avatarUrl, setAvatarUrl] = useState(savedAvatarUrl);
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    if (user) {
      setAvatarUrl(user.avatarUrl || "");
      dispatch(
        setSession({
          userId: user.id,
          displayName: user.name,
          avatarUrl: user.avatarUrl,
          activeOrganizationId: auth.activeOrganizationId
        })
      );
    }
  }, [auth.activeOrganizationId, dispatch, user]);

  const hasChanges = useMemo(
    () => avatarUrl.trim() !== savedAvatarUrl,
    [avatarUrl, savedAvatarUrl]
  );

  function updateAvatarUrl(event) {
    setAvatarUrl(event.target.value);
    setFieldError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextAvatarUrl = avatarUrl.trim();

    if (nextAvatarUrl && !imageUrlPattern.test(nextAvatarUrl)) {
      setFieldError("Enter an http(s) JPG, PNG, or WebP image URL.");
      return;
    }

    try {
      const data = await updateProfileMutation.mutateAsync({
        avatarUrl: nextAvatarUrl
      });
      dispatch(
        setSession({
          userId: data.user.id,
          displayName: data.user.name,
          avatarUrl: data.user.avatarUrl,
          activeOrganizationId: auth.activeOrganizationId
        })
      );
      setAvatarUrl(data.user.avatarUrl || "");
    } catch {
      // React Query stores the error for the inline form alert.
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-14">
      <div className="animate-rise-in">
        <p className="mb-4 inline-flex rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          Profile
        </p>
        <h1 className="text-4xl font-semibold leading-none tracking-tighter text-zinc-950 md:text-5xl dark:text-white">
          Keep your account image recognizable.
        </h1>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Add a hosted JPG, PNG, or WebP image URL. The app stores only the URL
          string and uses initials when the image is missing.
        </p>
      </div>

      <form
        className="animate-rise-in rounded-lg border border-zinc-200 bg-white p-5 shadow-soft [animation-delay:90ms] sm:p-7 dark:border-zinc-800 dark:bg-zinc-900"
        onSubmit={handleSubmit}
      >
        {currentUserQuery.isLoading && <ProfileSkeleton />}

        {currentUserQuery.isError && (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
            <div className="flex gap-2">
              <WarningCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Profile settings are unavailable.</p>
                <p className="mt-1">{currentUserQuery.error.message}</p>
                <Link
                  to="/login"
                  className="mt-3 inline-flex font-semibold text-rose-900 underline underline-offset-4 dark:text-rose-100"
                >
                  Sign in to update your avatar
                </Link>
              </div>
            </div>
          </div>
        )}

        {currentUserQuery.data && (
          <>
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
              <div className="grid gap-3">
                <AvatarPreview
                  size="lg"
                  src={avatarUrl.trim()}
                  name={displayName}
                  alt={`${displayName} avatar preview`}
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-500">Square preview</p>
              </div>
              <div className="grid gap-5">
                <div className="flex items-start gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <ImageSquare
                    size={20}
                    className="mt-0.5 shrink-0 text-accent dark:text-emerald-400"
                  />
                  <div>
                    <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                      URL only for now
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      Paste a direct image URL. Upload storage can be added later
                      without changing the visible profile layout.
                    </p>
                  </div>
                </div>
                <TextInput
                  id="avatarUrl"
                  name="avatarUrl"
                  type="url"
                  label="Avatar URL"
                  helperText="Accepted formats: JPG, PNG, or WebP URL. Leave blank to clear."
                  placeholder="https://example.com/avatar.webp"
                  value={avatarUrl}
                  error={fieldError}
                  onChange={updateAvatarUrl}
                />
              </div>
            </div>

            {updateProfileMutation.isError && (
              <div className="mt-5 flex gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
                <WarningCircle size={18} className="mt-0.5 shrink-0" />
                <span>{updateProfileMutation.error.message}</span>
              </div>
            )}

            {updateProfileMutation.isSuccess && !hasChanges && (
              <div className="mt-5 flex gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200">
                <CheckCircle size={18} className="mt-0.5 shrink-0" />
                <span>Profile avatar saved.</span>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {hasChanges ? "You have unsaved avatar changes." : "Profile avatar is up to date."}
              </p>
              <Button
                type="submit"
                disabled={!hasChanges || updateProfileMutation.isPending}
                className="sm:min-w-32"
              >
                {updateProfileMutation.isPending ? "Saving" : "Save avatar"}
              </Button>
            </div>
          </>
        )}
      </form>
    </section>
  );
}

function ProfileSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr]" aria-label="Loading profile settings">
      <span className="h-28 w-28 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
      <div className="grid gap-4">
        <span className="h-20 w-full animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
        <span className="h-11 w-full animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
