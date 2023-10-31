import { useMediaQuery } from "react-responsive";
import { useMounted } from "./use-mounted";

const useIsMobile = (maxWidth) => {
  const query = maxWidth ? `(max-width: ${maxWidth})` : "(max-width: 987px)";
  const isMobile = useMediaQuery({ query });
  const hasMounted = useMounted();

  return isMobile && hasMounted;
};

export const useIsPhone = () => {
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });
  const hasMounted = useMounted();

  return isPhone && hasMounted;
};

export default useIsMobile;
