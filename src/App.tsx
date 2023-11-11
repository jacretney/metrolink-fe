import "./App.css";
import TramTimetable from "./components/TramTimetable";
import Weather from "./components/Weather";
import Time from "./components/Time";

function App() {
      return (
          <div className="app font-dots">
              <TramTimetable />
              <div id="bottom">
                  <Time />
                  <Weather />
              </div>
          </div>
      );
}

export default App;