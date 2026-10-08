/** Prefix app-owned paths without altering encoded original asset filenames. */
export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const localeSegment = (pathname: string) => {
  const base = import.meta.env.BASE_URL;
  return (pathname.startsWith(base) ? pathname.slice(base.length) : '').split('/')[0];
};
