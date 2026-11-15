import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="py-16">
      <p className="text-xs uppercase tracking-widest text-muted">Missing</p>
      <h1 className="mt-2 font-display text-4xl">No such board</h1>
      <p className="mt-3 max-w-lg text-muted">That path is not on the floor.</p>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center text-flame">
        Return to the floor
      </Link>
    </div>
  );
}
