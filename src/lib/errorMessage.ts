import { AxiosError } from "axios"


export const getApiErrorMessage = (err: unknown) => {
  const defaultMessage = 'Something went wrong';
  if (err instanceof AxiosError) return err.response?.data?.message || defaultMessage
  if (err instanceof Error) {
    console.log(err)
    return err.message
  }
  return defaultMessage
}