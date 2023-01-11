import { Component } from "react";
import ErrorMessage  from "../errorMessage/errorMessage";

class ErrorBoundary extends Component{

    state = {
        error:false,
    }

    componentDidCatch(err,info){
        this.setState({
            error:true,
        })
    }

    render(){
        if(this.state.prop){
            return <ErrorMessage/>
        }
        return this.props.children;
    }


}

export default ErrorBoundary;




