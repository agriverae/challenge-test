import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BuildLab } from "./solution";
import { Solution } from "./solution";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/labyrinth">
          <Solution
            targetPosition={[6, 9]}
            availableCells={[
              [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
              [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
              [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
              [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
              [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
              [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
              [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
              [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
              [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
            ]}
            startingPosition={[4, 4]}
            moveLimit={25}
            cellSize={30}
          />
        </Route>
        <Route path="/buildLab">
          <BuildLab />
        </Route>
        <Route path="/">
          <div className="intro">
            <h1>Help Krilin Resurrect...Again</h1>
            <Link to="/buildLab">Build Now!</Link>
            <Link to="/labyrinth">Play!</Link>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
