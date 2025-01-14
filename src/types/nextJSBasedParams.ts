export type ParamsProps = {
    params: Promise<{ titleSlug: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }