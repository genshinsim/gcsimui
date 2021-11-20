import { useAppDispatch, useAppSelector } from "~/src/app/hooks";
import { RootState } from "~/src/app/store";
import Graph from "./Graph";

import TextSummary from "./TextSummary";

export default function Result() {
  const dispatch = useAppDispatch();
  const { result } = useAppSelector((state: RootState) => {
    return {
      result: state.result,
    };
  });

  if (result.data === null) {
    return (
      <div className="flex flex-col pl-6 pr-6">
        <div className="bg-gray-700 p-2 rounded-md flex flex-col">
          No result available. Please run sim first.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pl-6 pr-6">
      <div className="bg-gray-700 p-2 rounded-md flex flex-col">
        <div className="text-lg font-medium pt-2 pb-2">
          Damage Breakdown (in damage/second, on average)
        </div>
        <div className="m-2 p-2 rounded-md bg-gray-600">
          <p>
            In total, the team did{" "}
            <strong className="text-gray-100">
              {result.data.dps.mean.toFixed(2)}
            </strong>
            damage per second (on average, over {result.data.iter} iterations
            [min: {result.data.dps.min.toFixed(2)}, max:{" "}
            {result.data.dps.max.toFixed(2)}, std dev:{" "}
            {result.data.dps.sd?.toFixed(2)}]), over the course of{" "}
            {result.data.sim_duration.mean.toFixed(2)} seconds. The simulation
            took {(result.data.runtime / 1000000000).toFixed(3)} seconds
          </p>
        </div>
        <Graph data={result.data} />
        <TextSummary text={result.data.text} />
      </div>
    </div>
  );
}
