import React from 'reactn';
import footnotes from './footnotes.json';

export default class Footnotes extends React.Component {
  render() {
    return (
      <footer className="bg-primary-3 text-white links-white pb-4 footer-1">
        <div className="container">
          <p>Footnotes</p>
          <ul className="footnote-list">
          {
            footnotes.map((note) => {
              return (
                <li id={`footnote-${note.number}`}><span className="footnote">{note.number}</span> - {note.content} <a href={note.link} target="_blank" rel="noopener noreferrer">More here</a>. </li>
              )
            })
          }
          </ul>
        </div>
      </footer>
    )
  }
}