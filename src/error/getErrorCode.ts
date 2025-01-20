export function getErrorCode(error: any): string | null {
  return error?.response?.data?.error?.code || null;
}
