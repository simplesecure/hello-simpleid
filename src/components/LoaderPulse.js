import React from 'reactn';
import '../loader-pulse.css';

export default class LoaderPulse extends React.Component {
  render() {
    console.log("I'm here!!");
    return (
      <div className="text-center loading-pulse">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    )
  }
}