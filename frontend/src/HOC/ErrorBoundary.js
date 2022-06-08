 import { Component } from "react";

 /**
  * Wyłapuje błędy w aplikacji
  */
 class ErrorBoundary extends Component {
     state = {
         hasError: false,
         error: null
     }

     static getDerivedStateFromError(error) {
         return { hasError: true, error };
     }

     componentDidCatch(error, errorInfo) {
        // console.log('Error Boundary:')
        // console.log(error)
        // console.log('=========================================')
        // console.log(errorInfo)
     }

     render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger">
                    We have problem {this.state.error.message}
                </div>
            )
        }
        return this.props.children;
     }

 }

 export default ErrorBoundary;