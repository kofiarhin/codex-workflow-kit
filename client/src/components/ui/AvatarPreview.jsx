import { useEffect, useMemo, useState } from "react";

export function AvatarPreview({
  alt = "Profile avatar",
  className = "",
  name = "",
  size = "md",
  src = ""
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = useMemo(() => getInitials(name), [name]);
  const canShowImage = src && !imageFailed;
  const sizeClass =
    size === "lg" ? "h-28 w-28 text-2xl" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  return (
    <span
      className={[
        "relative grid shrink-0 place-items-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 font-semibold uppercase text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200",
        sizeClass,
        className
      ].join(" ")}
    >
      {canShowImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}
