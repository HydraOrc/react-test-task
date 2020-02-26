import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LineChart from 'components/LineChart';
import AlertThreshold from 'app/AlertThreshold';
import GroupedNumbersChart from 'app/GroupedNumbersChart';
import { setThreshold as setThresholdAction } from 'reducers/number/actions';
import { getDiapasons, getNumbers } from 'reducers/number/selectors';

function App() {
  const dispatch = useDispatch();

  const diapasons = useSelector(getDiapasons);
  const numbers = useSelector(getNumbers);

  const setThreshold = useCallback((threshold) => {
    dispatch(setThresholdAction(threshold));
  }, [dispatch]);

  return (
    <div>

      <LineChart data={[numbers]} />

      <GroupedNumbersChart diapasons={diapasons} />

      <AlertThreshold setThreshold={setThreshold} />

    </div>
  );
}

export default App;
