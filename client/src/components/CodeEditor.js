import {React, Component} from 'react';

const code = `function add(a, b) {
  return a + b;
}
`;
 
class CodeEditor extends Component {
  state = { code };
 
  render() {
    return (
        <div className="container mt-4 mb-4">
            <div className="row">
                
            </div>
        </div>
      
    );
  }
}

export default CodeEditor;