import "./App.css";
import TramTimetable from "./components/TramTimetable";
import Weather from "./components/Weather";

function App() {

      return (
          <div className="app font-dots">
              <TramTimetable />
              <Weather />
          </div>
      );
}

export default App;