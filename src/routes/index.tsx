import { createFileRoute } from "@tanstack/react-router";
import { OpsBoard } from "@/components/ops-board";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Ops floor · Lantern" }] }),
  component: OpsBoard,
});
