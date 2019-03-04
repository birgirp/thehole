import React, { Component } from "react";

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Minnismiðakerfi Bigga</h1>
                <p>Framendi:</p>
                <ul>
                    <li>React sem JS framework</li>
                    <li><a href="https://react.semantic-ui.com/" target="_blank" rel="noopener noreferrer">Semantic UI</a> sem undirliggjandi CSS</li>
                    <li>Webpack og margt fleira fyrir build processinn</li>
                </ul>
                <hr />
                <p>Node.js bakendi:</p>
                <ul>
                    <li>Express fyrir routing</li>
                    <li>File-based "gagnagrunnur"</li>
                    <li>Nodemon og alls konar önnur tól</li>
                </ul>
            </div>
        )
    }
}

export default Home;