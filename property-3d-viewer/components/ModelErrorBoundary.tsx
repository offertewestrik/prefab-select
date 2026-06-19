"use client";

import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };
type State = { failed: boolean };

/**
 * Vangt fouten bij het laden van de GLB op (bv. netwerk/parse) en toont
 * dan de procedurele villa, zodat de viewer nooit met een leeg scherm faalt.
 */
export default class ModelErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.warn("3D-model laden mislukt, terugval op procedurele villa:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
