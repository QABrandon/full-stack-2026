import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="empty-state" role="alert" tabIndex="-1">
          <h1>Something went wrong</h1>
          <p>Refresh the page or return to your library to keep browsing.</p>
          <a className="btn btn--primary" href="/library">
            Back to My Library
          </a>
        </section>
      );
    }

    return this.props.children;
  }
}
