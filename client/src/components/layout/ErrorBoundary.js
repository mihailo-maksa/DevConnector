import React, { PureComponent } from "react";

import ErrorPage from "./ErrorPage";

export default class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `Error Boundary has catched an error: ${error}, Error Info: ${errorInfo}`
    );
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
