
// ---------- import Local Tools
import { useRoutes } from '../../..';

// ---------- set GoTo Router (with All Screens Access)
export const goTo = (newRoute) =>
  useRoutes.setState({ currRoute: newRoute });

  