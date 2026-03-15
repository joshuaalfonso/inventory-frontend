import { AxiosError } from "axios"


export const getApiErrorMessage = (err: unknown) => {
  if (err instanceof AxiosError) return err.response?.data?.message || err.message
  if (err instanceof Error) return err.message
  return 'Something went wrong'
}