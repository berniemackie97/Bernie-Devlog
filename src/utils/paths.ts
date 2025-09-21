export const paths = {
  cards: {
    networkEngineering: "/cards/network-engineering",
    ethicalHacking: "/cards/ethical-hacking",
  },
  issues: {
    featured: "/issues/featured",
    networkEngineering: "/issues/network-engineering",
  },
};

export function norm(p: unknown): string {
  return String(p || "/").replace(/\/+$/, "") || "/";
}

export function isOnPath(currentPath: string, targetPath: string): boolean {
  return norm(currentPath) === norm(targetPath);
}
