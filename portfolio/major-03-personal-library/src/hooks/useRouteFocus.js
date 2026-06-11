import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useRouteFocus() {
  const location = useLocation();

  useEffect(() => {
    const heading = document.querySelector("main h1");
    if (heading) {
      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
      }
      heading.focus({ preventScroll: true });
    }
  }, [location.pathname]);
}
