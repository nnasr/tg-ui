import React from 'react';
import GenericError from './GenericError';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error, info) {
    // display fallback UI
    this.setState({
      error
    });
  }

  // render error component with appropriate error messages from props
  render() {
    const { error } = this.state;
    const { ErrorComponent } = this.props;
    if (error) {
      return ErrorComponent ? (
        <ErrorComponent error={error} />
      ) : (
        <GenericError error={error} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
