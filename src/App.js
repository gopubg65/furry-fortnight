
import {useState, useEffect} from "react";
import PromiseState from "./Components/PromiseState";
import {getPlanets} from './Actions/Planets';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const [isPromiseResolved, setIsPromiseResolved] = useState(false);
  useEffect(() => {
    dispatch(getPlanets(setIsPromiseResolved))
  }, [dispatch])
  return (
    <div className="App">
    {isPromiseResolved ? <PromiseState/> : "Loading"} 
    </div>
  );
}

export default App;
