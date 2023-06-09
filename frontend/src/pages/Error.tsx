import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError()

  let title = 'An error occured!'
  let message = 'Something went wrong!'

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 500:
        message = error.data.message
        break
      case 404:
        title = 'Not found!'
        message = 'Could not find resource or page.'
        break
    }
  }
  
  return (
    <>
      <MainNavigation />
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  )
}

export default ErrorPage
