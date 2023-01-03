import React, { useEffect} from 'react';
import './Counter.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {
  decreaseBy,
  decrement, fetchCounter,
  increaseBy,
  incrementCounter
} from "./counterSlice";


const Counter = () => {
  const dispatch: AppDispatch = useDispatch();
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const counterLoading = useSelector((state: RootState) => state.counter.loading);
  const updaterLoading = useSelector((state: RootState) => state.counter.updateLoading);

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  const onIncrement = async () => {
    await dispatch(incrementCounter());
    await dispatch(fetchCounter());
  };
  let counter: number | string = counterValue;

  if (updaterLoading) {
    counter = 'Updating...';
  }

  if (counterLoading) {
    counter = 'Loading...';
  }

  return (
      <div className="Counter">
        <h1>{counter}</h1>
        <button onClick={onIncrement}>Increase</button>
        <button onClick={() => dispatch(decrement())}>Decrease</button>
        <button onClick={() => dispatch(increaseBy(5))}>Increase by 5</button>
        <button onClick={() => dispatch(decreaseBy(5))}>Decrease by 5</button>
      </div>
  );
};

export default Counter;