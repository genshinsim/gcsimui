import React from "react";
import { save, open } from "@tauri-apps/api/dialog";
import { useAppDispatch, useAppSelector } from "~/src/app/hooks";
import { RootState } from "~/src/app/store";
import useLocation from "wouter/use-location";
import { addCharacter } from "./teamSlice";

function NewChar({ handleAdd }: { handleAdd: () => any }) {
  return (
    <button
      className="bg-gray-700 m-1 shadow p-4 rounded-md text-sm hover:bg-gray-400 flex justify-center items-center"
      onClick={handleAdd}
    >
      <div className="h-48 w-48 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </button>
  );
}

export default function Team() {
  const dispatch = useAppDispatch();
  const { team } = useAppSelector((state: RootState) => {
    return {
      team: state.team,
    };
  });
  const [_, setLocation] = useLocation();

  //handlers
  const handleAddNewChar = () => {
    dispatch(addCharacter);
  };
  const handleOpenSave = () => save().then((path) => console.log(path));
  const handleOpenLoad = () => open().then((path) => console.log(path));

  //elements

  let cards: JSX.Element[] = [];

  team.forEach((c, i) => {});

  cards = team.map((c, i) => {
    return <div key={c.key}>character goes here</div>;
  });

  if (cards.length < 4) {
    cards.push(<NewChar handleAdd={handleAddNewChar} key="new" />);
  }

  return (
    <div className="flex flex-col">
      <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-4 lg:pl-4 lg:pr-4">
        {cards}
      </div>

      <div className="mt-2 flex flex-row sm:flex-wrap gap-4 lg:pl-4 lg:pr-4">
        <div className=" flex-1">
          <button className="btn btn-primary w-full" onClick={handleOpenSave}>
            Save
          </button>
        </div>
        <div className="flex-1">
          <button className="btn btn-secondary w-full" onClick={handleOpenLoad}>
            Load
          </button>
        </div>
        <div className="flex-1">
          <button
            className="btn btn-info w-full"
            onClick={() => setLocation("/import")}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
