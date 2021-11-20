import React from "react";
import { RootState } from "~/src/app/store";
import { setOption } from "./configSlice";
import styled from "styled-components";
import Modal from "react-overlays/Modal";
import ModalBackdrop from "~/src/components/ModalBackdrop";
import { useAppDispatch, useAppSelector } from "~/src/app/hooks";

const StyledModal = styled(Modal)`
  position: fixed;
  width: 33vw;
  z-index: 4000;
  top: 50%;
  left: 50%;
  padding: 20px;
  outline: none;
  transform: translate(-50%, -50%);
`;

export default function Options({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => any;
}) {
  const renderBackdrop = (props: any) => <ModalBackdrop {...props} />;

  return (
    <StyledModal
      show={show}
      renderBackdrop={renderBackdrop}
      onHide={onHide}
      aria-labelledby="modal-label"
    >
      <OptionsDetails />
    </StyledModal>
  );
}

function OptionsDetails() {
  const dispatch = useAppDispatch();
  const { opt } = useAppSelector((state: RootState) => {
    return {
      opt: state.settings.options,
    };
  });

  const pattern = new RegExp(/^[0-9]{1,4}$/m);
  const workerPattern = new RegExp(/^[0-9]{1,2}$/m);
  const iterPattern = new RegExp(/^[0-9]{1,6}$/m);

  const handleEditDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (pattern.test(val)) {
      e.target.setCustomValidity("");
      let next = { ...opt };
      next.d = parseInt(val);
      dispatch(setOption(next));
      return;
    }
    e.target.setCustomValidity("invalid input");
  };

  const handleEditIter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (iterPattern.test(val)) {
      e.target.setCustomValidity("");
      let next = { ...opt };
      next.i = parseInt(val);
      dispatch(setOption(next));
      return;
    }
    e.target.setCustomValidity("invalid input");
  };

  const handleEditWorkers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (workerPattern.test(val)) {
      e.target.setCustomValidity("");
      let next = { ...opt };
      next.w = parseInt(val);
      dispatch(setOption(next));
      return;
    }
    e.target.setCustomValidity("invalid input");
  };
  const handleToggleDebug = (e: React.ChangeEvent<HTMLInputElement>) => {
    let next = { ...opt };
    next.debug = e.target.checked;
    dispatch(setOption(next));
  };
  const handleToggleUseBuilder = (e: React.ChangeEvent<HTMLInputElement>) => {
    let next = { ...opt };
    next.useBuilder = e.target.checked;
    dispatch(setOption(next));
  };

  return (
    <div
      className="flex flex-col edit-content bg-gray-700 p-4 rounded-md shadow edit-content gap-2"
      style={{}}
    >
      <div className="font-medium text-lg flex-grow">Options</div>
      <div className="flex flex-row p-1 justify-items-center">
        <div className="flex items-center flex-grow">Sim Duration</div>
        <div className="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300">
          <input
            type="number"
            placeholder="enter amount"
            className="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500 noarrow"
            value={opt.d}
            onChange={handleEditDuration}
          />
          <div className="p-1 w-2 rounded-r-md bg-gray-800 items-center flex" />
        </div>
      </div>
      <div className="flex flex-row p-1 justify-items-center">
        <div className="flex items-center  flex-grow">Iterations</div>
        <div className="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300">
          <input
            type="number"
            placeholder="enter amount"
            className="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500 noarrow"
            value={opt.i}
            onChange={handleEditIter}
          />
          <div className="p-1 w-2 rounded-r-md bg-gray-800 items-center flex" />
        </div>
      </div>
      <div className="flex flex-row p-1 justify-items-center">
        <div className="flex items-center  flex-grow">Workers</div>
        <div className="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300">
          <input
            type="number"
            placeholder="enter amount"
            className="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500 noarrow"
            value={opt.w}
            onChange={handleEditWorkers}
          />
          <div className="p-1 w-2 rounded-r-md bg-gray-800 items-center flex" />
        </div>
      </div>
      <div className="flex flex-row p-1 justify-items-center">
        <div className="flex items-center  flex-grow">Debug</div>
        <div className="ml-4 mr-4 rounded-md">
          <input
            type="checkbox"
            checked={opt.debug}
            className="toggle toggle-primary"
            onChange={handleToggleDebug}
          />
        </div>
      </div>
      <div className="flex flex-row p-1 justify-items-center">
        <div className="flex items-center  flex-grow">Use Builder</div>
        <div className="ml-4 mr-4 rounded-md">
          <input
            type="checkbox"
            checked={opt.useBuilder}
            className="toggle toggle-primary"
            onChange={handleToggleUseBuilder}
          />
        </div>
      </div>
    </div>
  );
}
