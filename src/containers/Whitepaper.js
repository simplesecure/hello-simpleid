import React from 'reactn';
import Sections from '../containers/Sections';
import Footnotes from '../components/Footnotes';

export default class Whitepaper extends React.Component {
  render() {
    return (
      <div>
        <Sections />
        <Footnotes />
      </div>
    )
  }
}