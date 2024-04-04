export type ThemeConfig = {
  title: string,
  author: {
    name: string,
    email: string,
    github: string,
  },
  giscus: {
    repo: `${string}/${string}`,
    repoId: string,
    category: string,
    categoryId: string,
    lightTheme: string,
    darkTheme: string,
  },
  googleAnalytics: {
    trackingId: string,
  },
  since: number,
}