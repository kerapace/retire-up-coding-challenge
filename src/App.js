import {useState} from 'react';
import returnList from './returns';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './App.css';
const Range = Slider.createSliderWithTooltip(Slider.Range);

function App() {
  const returns = returnList.slice().sort((a,b) => a.year - b.year);
  const [range,setRange] = useState([0,returns.length]);
  const [start, end] = range;
  const differences = returns.slice();
  differences.forEach((_,idx) => differences[idx] = idx === 0 ? parseFloat(returns[idx].totalReturn) : parseFloat(returns[idx].totalReturn) + differences[idx-1]);
  return (
    <div className="App">
      <h2>S&P Returns</h2>
      <div className={"range-container"}>
        <Range value={[start,end]} tipFormatter={(idx => idx + 1926)} onChange={e => {setRange(e)}} pushable/>
      </div>
      <ReturnsTable {...{returns,differences,start,end}}/>
    </div>
  );
}

function ReturnsTable({returns,differences,start,end}) {
  return (
    <section className={"table-container"}>
      <table className={"table table-hover"}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Yearly Return</th>
            <th>Cumulative Return</th>
          </tr>
        </thead>
        <tbody>
          {
          returns.slice(start,end).map((_,idx) => (
            <tr key={idx}>
              <td>{returns[start+idx].year}</td>
              <td>{returns[start+idx].totalReturn}</td>
              <td>{start === 0 ? differences[start+idx].toFixed(2) : (differences[start+idx] - differences[start-1]).toFixed(2)}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default App;
