import React from 'react';
import {
    Step,
    Stepper,
    StepLabel
} from 'material-ui/Stepper';
import {
    Card,
    CardHeader,
    CardMedia,
    CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Uploader from './Uploader';
import DataViewer from './DataViewer';
import Features from './Features';
import NeuralNetwork from './NeuralNetwork';
import Training from './Training';


const style = {
  margin: 20
};

class Wizard extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;

        if (stepIndex === 1) {
            // We're dealing with the features step
            this.refs.features.preProcessData();
        }

        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 3,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <Uploader/>
                );
            case 1:
                return (
                    <div>
                        <Features ref="features"/>
                        <DataViewer/>
                    </div>
                );
            case 2:
                return (
                    <NeuralNetwork/>
                );
            case 3:
                return (
                    <Training/>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onTouchTap={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === 3 ? 'Finish' : 'Next'}
                        primary={true}
                        onTouchTap={this.handleNext}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <Card style={style}>
                <CardHeader
                    title="Neural Network Builder"
                    subtitle="Guided step-by-step publishing"
                    avatar="images/gowildly.png"
                />
                <CardMedia>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Upload Data</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Clean Data</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Create</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Train</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Make Smarter</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Test</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Publish</StepLabel>
                        </Step>
                    </Stepper>
                </CardMedia>
                <CardText>
                    <ExpandTransition loading={loading} open={true}>
                        {this.renderContent()}
                    </ExpandTransition>
                </CardText>
            </Card>
        );
    }
}

export default Wizard;