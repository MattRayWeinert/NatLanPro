import { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { wait } from "@testing-library/user-event/dist/utils";

class home extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            maskValue: '',
            maskResponse: '',
            maskDuration: '',
            summaryValue: '',
            summaryResponse: '',
            summaryDuration: '',
            transValue: '',
            transResponse: '',
            transDuration: ''
        };

        this.handleMask = this.handleMask.bind(this);
        this.handleMaskChange = this.handleMaskChange.bind(this);
        this.handleSummarization = this.handleSummarization.bind(this);
        this.handleSummaryChange = this.handleSummaryChange.bind(this);
        this.handleTranslation = this.handleTranslation.bind(this);
        this.handleTranslationChange = this.handleTranslationChange.bind(this);
    }
    
    componentDidMount()
    {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };
    }

    handleMaskChange(event) {
        this.setState({
            maskValue: event.target.value
        });
      }
      
    handleMask(event) {
        
        event.preventDefault();
        
        var test = {"data": [ this.state.maskValue ] };
        
        axios.post('https://hf.space/gradioiframe/course-demos/distilbert-base-uncased-finetuned-imdb/+/api/predict/', test)
            .then(res => {
                this.setState({
                    maskResponse: res.data.data[0].confidences[0].label,
                    maskDuration: res.data.avg_durations[0]
                });

                console.log(res.data)
            });
    }

    handleSummaryChange(event) {
        this.setState({
            summaryValue: event.target.value
        });
    }

    handleSummarization(event) {
        event.preventDefault();
        var test = {"data": [ this.state.summaryValue ] };
        axios.post('https://hf.space/gradioiframe/course-demos/mt5-small-finetuned-amazon-en-es/+/api/predict/', test)
            .then(res => {
                this.setState({
                    summaryResponse: res.data.data,
                    summaryDuration: res.data.durations
                });
            });
    }

    handleTranslationChange(event) {
        this.setState({
            transValue: event.target.value
        });
    }

    handleTranslation(event) {
        event.preventDefault();
        var test = {"data": [ this.state.transValue ] };
        axios.post('https://hf.space/gradioiframe/course-demos/marian-finetuned-kde4-en-to-fr/+/api/predict/', test)
            .then(res => {
                console.log(res.data)
                this.setState({
                    transResponse: res.data.data,
                    transDuration: res.data.durations
                });
            });
    }
    
    render()
    {
      return (
        <div className="App">
            <div className="container">
                <h1>Natural Language Processing 🤗</h1>
                <p>This website utilizes some of the Hugging Face transformer functions. You can find out more about Hugging Face and their API's on their website <a href="https://huggingface.co/course/chapter0/1?fw=tf" target="_blank">here</a>.</p>
                <br/>
                <br/>
                <div className="row">
                    <div className="col" style={{height: "10rem"}}>
                        <label>
                            Mask: 
                        </label>
                    </div>
                    <div className="col" style={{height: "10rem"}}>
                        <form onSubmit={this.handleMask} style={{height: "100%"}}>
                            <textarea type="text" placeholder="This is a [MASK]." name="mask" value={this.state.maskValue} onChange={this.handleMaskChange} style={{height: "70%", width: "100%"}}></textarea>
                            <Button variant="primary" type="button" onClick={this.handleMask}>Submit</Button>
                        </form>
                    </div>
                    <div className="col" style={{height: "10rem"}}>
                        Output:&emsp;{ this.state.maskResponse } <br/> Time:&emsp;{ this.state.maskDuration }
                    </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col" style={{height: "10rem"}}>
                        <label>
                            Output: 
                        </label>
                    </div>
                    <div className="col" style={{height: "10rem"}}>
                        <form onSubmit={this.handleSummarization} style={{height: "100%"}}>
                            <textarea type="text" placeholder="Put a summary for an summary." 
                                name="summary"
                                value={this.state.summaryValue}
                                onChange={this.handleSummaryChange}
                                style={{height: "70%", width: "100%"}}>
                            </textarea>
                            <Button variant="primary" type="button" onClick={this.handleSummarization}>Submit</Button>
                        </form>
                    </div>
                    <div className="col" style={{height: "10rem"}}>
                        Output:&emsp;{ this.state.summaryResponse } <br/> Time:&emsp;{ this.state.summaryDuration }
                    </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col" style={{height: "10rem"}}>
                        <label>
                            Translate: 
                        </label>
                    </div>
                    <div className="col" style={{height: "10rem"}}>
                        <form onSubmit={this.handleTranslation} style={{height: "100%"}}>
                            <textarea type="text" placeholder="Trasnlate to french." 
                                name="summary"
                                value={this.state.transValue}
                                onChange={this.handleTranslationChange}
                                style={{height: "70%", width: "100%"}}>
                            </textarea>
                            <Button variant="primary" type="button" onClick={this.handleTranslation}>Submit</Button>
                        </form>
                    </div>
                    <div className="col" style={{height: "10rem"}}>
                        Output:&emsp;{ this.state.transResponse } <br/> Time:&emsp;{ this.state.transDuration }
                    </div>
                </div>
                <br/>
                <footer style={{position: "absolute", bottom: 0}}>
                    Matt Weinert 2022
                </footer>
            </div>
        </div>
      )
    }
}




export default home;