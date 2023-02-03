export function mergeToLeft(
  main: Record<string, string>,
  sub: Record<string, string>
): Record<string, string> {
  const lack = Object.keys(sub).filter((key) => !main[key]);

  return lack.reduce(
    (pre, cur) => ({
      ...pre,
      [cur]: sub[cur],
    }),
    {}
  );
}
