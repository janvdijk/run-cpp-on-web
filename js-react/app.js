function Heading() {
    const title = 'Root finding web application';
    return <h1>{title}</h1>
  }

  function Result(props) {
    const root = props.root;
    let message = 'Not submitted';
    if (root !== undefined) {
      message = 'Function root is approximately at x = ' + root.toFixed(2);
    }
    return <div id="answer">{message}</div>;
  }

  function App() {
    const [tolerance, setTolerance] = React.useState(0.001);
    const [initial_guess, setGuess] = React.useState(-4);

    function onToleranceChange(event) {
      setTolerance(Number(event.target.value));
    }

    function onGuessChange(event) {
      setGuess(Number(event.target.value));
    }
    const [root, setRoot] = React.useState(undefined);

    function handleSubmit(event) {
      event.preventDefault();
      // Wait for module to initialize,
      createModule().then(({NewtonRaphson}) => {
        // Hardcoded input values
        const initial_guess = -4;
        const tolerance = 0.001;
        // Perform computation
        const newtonraphson = new NewtonRaphson(tolerance);
        const root = newtonraphson.solve(initial_guess);
        // Write the value of 'root' to the tag whose 'id' is equal to "answer"
        // document.getElementById("answer").innerHTML = root.toFixed(2);
        setRoot(root);
      });

    }

    return (
      <div>
        <Heading/>
        <form onSubmit={handleSubmit}>
          <label>
            Tolerance:
            <input name="tolerance" type="number" value={tolerance} onChange={onToleranceChange}/>
          </label>
          <label>
            Initial guess:
            <input name="initial_guess" type="number" value={initial_guess} onChange={onGuessChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Result root={root}/>
      </div>
    );
  }
  ReactDOM.render(
    <App/>,
    document.getElementById('container')
  );
