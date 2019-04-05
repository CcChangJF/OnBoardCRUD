import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Test extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Button color="red">BTN</Button>
            </div>
            );
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('index')
);
