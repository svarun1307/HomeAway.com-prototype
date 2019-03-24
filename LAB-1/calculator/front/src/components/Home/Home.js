import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';

const mTop = {
    marginTop : "5px"
}

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldVal : '',
            header : 'Calculator'
        }

        this.updateField = this.updateField.bind(this);
        this.addOperator = this.addOperator.bind(this);
        this.calculateExpression = this.calculateExpression.bind(this);
        this.clearState = this.clearState.bind(this);
    }


    updateField(e)
    {
        let oldVal = this.state.fieldVal;
        let vlsd = /^[\d\+\-\*\/\.]+$/.test(e.target.value);
        if(e.target.value==''){
            this.setState({
                fieldVal : ''
            });
            return;
        }

        if(vlsd)
        {
            this.setState({
                fieldVal : e.target.value
            });
        }
        else
        {
            this.setState({
                fieldVal : oldVal
            });
        }
    }


    addOperator(e)
    {
        let currentOperator = e.currentTarget.getAttribute("data-operator");
        let oldv = this.state.fieldVal;
        if(currentOperator=="+" || currentOperator=="-" || currentOperator=="*" || currentOperator=="/")
        {
            oldv = oldv + currentOperator;
            this.setState({
                fieldVal : oldv
            });
        }
    }

    clearState()
    {
        this.setState({
            fieldVal : "0"
        });
    }

    calculateExpression()
    {
        let y = this;
        if(this.state.fieldVal)
        {
            console.log({
                "expr" : JSON.stringify(this.state.fieldVal)
            });
            this.setState({
                header : "Loading Results..."
            });
            axios.post('http://localhost:8080/calculate', {
                "expr" : JSON.stringify(this.state.fieldVal)
            })
            .then(function (response) {
                //console.log(response);
                if(!isNaN(response.data))
                {
                    y.setState({
                        header : "Calculator",
                        fieldVal : (response.data).toFixed(2)
                    });
                }
                else 
                {
                    y.setState({
                        header : "Calculator",
                        fieldVal : ''
                    });
                    alert("Please enter a valid maths expression.");
                }
                
            })
            .catch(function (error) {
                console.log(error);
                y.setState({
                    header : "Calculator",
                    fieldVal : ''
                });
                alert("Please enter a valid maths expression.");
            });
        }
        
    }

    render() {
        return(
            <div className="container ">
            <div className="container margin-from-header ">
                <div className="col-lg-6 offset-lg-3 text-center">
                    <div className="card">
                        <div className="card-header card-title">
                         <h5>{this.state.header}</h5>
                        </div>
                        <div className="card-body button-holder">
                          
                            <div className="form-group">
                                <input type="text" name="ftext" className="form-control ralign" required id="ftext"  value={this.state.fieldVal} onChange={this.updateField} />
                              </div>
                            
                            <div className="row">
                                
                               
                                <button type="button" onClick={this.clearState} className="btn common clear-buttons col-lg-6"><div>C</div></button>
                                <button onClick={this.calculateExpression} type="button" className="btn common output-buttons col-lg-6"><div>=</div></button>
                            </div>
                            <div className="row" style={mTop} >
                               <button type="button" onClick={this.addOperator} data-operator="+" className="btn common operation-buttons col-lg-3"><div>+</div></button>
                               <button type="button" onClick={this.addOperator} data-operator="-"  className="btn common operation-buttons col-lg-3"><div>-</div></button>
                               <button type="button" onClick={this.addOperator} data-operator="*"  className="btn common operation-buttons col-lg-3"><div>*</div></button>
                               <button type="button" onClick={this.addOperator} data-operator="/"  className="btn common operation-buttons col-lg-3"><div>%</div></button>
                            </div>
                            {/* <div className="row">
                                <button type="button" className="btn common number-buttons col-lg-3"><div>4</div></button>
                                <button type="button" className="btn common number-buttons col-lg-3"><div>5</div></button>
                                <button type="button" className="btn common number-buttons col-lg-3"><div>6</div></button>
                                <button type="button" className="btn common operation-buttons col-lg-3"><div>-</div></button>
                             </div>
                             <div className="row">
                                <button type="button" className="btn common number-buttons col-lg-3"><div>1</div></button>
                                <button type="button" className="btn common number-buttons col-lg-3"><div>2</div></button>
                                <button type="button" className="btn common number-buttons col-lg-3"><div>3</div></button>
                                <button type="button" className="btn common operation-buttons col-lg-3"><div>+</div></button>
                             </div>
                             <div className="row">
                                <button type="button" className="btn common hidden-buttons col-lg-3"></button>
                                <button type="button" className="btn common number-buttons col-lg-3"><div>0</div></button>
                                <button type="button" className="btn common output-buttons col-lg-6"><div>=</div></button>
                                
                             </div> */}    
                        </div>
                      </div>
                </div>
            </div>


        </div>
        )
    }
}

export default SignUp;