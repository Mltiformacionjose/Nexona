import type { PillTone } from "@/components/ui/pill";
import type { TaskStatus } from "@/types/api";

/** Texto y color de cada estado. El texto siempre acompaña al color. */
export const TASK_STATUS: Record<TaskStatus, { label: string; tone: PillTone }> = {
  todo: { label: "Por hacer", tone: "info" },
  in_progress: { label: "En curso", tone: "accent" },
  done: { label: "Hecha", tone: "success" },
};
