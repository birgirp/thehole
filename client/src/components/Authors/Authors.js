import React, { Component } from "react";

class Authors extends Component {
  state = {
    authors: ["Valdi", "Biggi?"]
  }

  render() {
    return (
      <div>
        <h1>Höfundar</h1>
        {this.state.authors.map((author, index) => {
          return (
            <p key={index}>
              {author}
            </p>
          );
        })}

        <h1>TO DO</h1>
        <p>Hugmyndir um betrumbætingar:</p>
        <ul>
          <li>Nota einfaldan file-based gagnagrunn í stað stað 
            skráa. <a href="https://www.npmjs.com/package/lowdb" target="_blank" rel="noopener noreferrer">
            Sjá t.d. lowdb sem er mjög vinsæll</a>
          </li>
          <li>Útfæra update memo</li>
          <li>Það er alltaf hægt að lagfæra útlit...</li>
        </ul>
      </div>
    )
  }
}

export default Authors;