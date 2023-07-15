import {
  useNavigate as useRouteNavigate,
  useParams as useRouteParams,
  useSearchParams,
  useLocation as useRouteLocation,
} from 'react-router-dom'

export const useNavigate = () => {
  const navigate = useRouteNavigate()
  return navigate
}

export const useParams = () => {
  const routeParams = useRouteParams()
  const [searchParams] = useSearchParams()
  const params = { ...routeParams }
  for (const [key, value] of searchParams) {
    params[key] = value
  }
  return params
}

export const useLocation = () => {
  const location = useRouteLocation()
  return location
}
