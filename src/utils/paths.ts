export const paths = {
  cards: {
    networkEngineering: "/cards/network-engineering",
    ethicalHacking: "/cards/ethical-hacking",
    automationPlaybook: "/cards/automation-playbook",
    frontendObservability: "/cards/frontend-observability",
  },
  issues: {
    featured: "/issues/featured",
    networkEngineering: "/issues/network-engineering",
    ethicalHacking: "/issues/ethical-hacking",
    automationPlaybook: "/issues/automation-playbook",
    frontendObservability: "/issues/frontend-observability",
  },
};

export function norm(p: unknown): string {
  return String(p || "/").replace(/\/+$/, "") || "/";
}

export function isOnPath(currentPath: string, targetPath: string): boolean {
  return norm(currentPath) === norm(targetPath);
}
