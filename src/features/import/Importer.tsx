import { useAppDispatch, useAppSelector } from "~/src/app/hooks";
import { RootState } from "~/src/app/store";
import React from "react";
import { staticPath, parseFromGO, Character } from "~/src/util";
import { setJSON } from "./importSlice";
import portraits from "/assets/avatar/*.png";

const notImplemented = [
  "traveler",
  "aether",
  "aloy",
  "barbara",
  "lumine",
  "mona",
  "qiqi",
  "razor",
  "sangonomiyakokomi",
  "sayu",
  "tartaglia",
  "thoma",
  "xinyan",
  "yanfei",
];

function GridView({
  chars,
  selected,
  handleSelect,
}: {
  chars: Character[];
  selected: boolean[];
  handleSelect: (index: number) => any;
}) {
  const blocks = chars.map((char, index) => {
    return (
      <div
        key={char.key}
        className={
          selected[index]
            ? "selected-char-box overflow-hidden rounded-md border-2"
            : notImplemented.includes(char.key.toLowerCase())
            ? "selected-char-box overflow-hidden rounded-md border-2 border-transparent cursor-not-allowed"
            : "selected-char-box overflow-hidden rounded-md border-2 border-transparent hover:bg-gray-500 cursor-pointer"
        }
        onClick={() => {
          if (notImplemented.includes(char.key.toLowerCase())) {
            return;
          }
          handleSelect(index)();
        }}
      >
        <img
          src={`${staticPath.avatar}/${char.key}.png`}
          alt={char.name}
          className={
            selected[index]
              ? "object-contain opacity-100"
              : "object-contain opacity-50"
          }
        />
      </div>
    );
  });

  return <div className="grid grid-cols-12 gap-2 ">{blocks}</div>;
}

export default function Importer() {
  const dispatch = useAppDispatch();
  const { text } = useAppSelector((state: RootState) => {
    return {
      text: state.import,
    };
  });
  const [err, setErr] = React.useState<string>("");
  const [chars, setChars] = React.useState<Character[]>([]);
  const [selected, setSelected] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    const data = parseFromGO(text);
    setChars(data.characters);
    setSelected(data.selected);
    setErr(err);
  }, [text]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setJSON(e.currentTarget.value));
  };

  const handleSelect = (index: number) => {
    let next = [...selected];
    //check if this one is already true
    if (next[index]) {
      next[index] = false;
    } else {
      //count number of trues
      const count = next.filter(Boolean).length;
      if (count < 4) {
        next[index] = true;
      }
    }
    setSelected(next);
  };

  return (
    <div className="flex flex-col gap-y-4 pl-8 pr-8">
      <div>
        <div className="text-lg font-bold">Instructions</div>
        Under Genshin Optimizer's{" "}
        <a
          className="text-blue-600 hover:text-blue-400"
          target="_blank"
          href="https://frzyc.github.io/genshin-optimizer/#/database"
        >
          database
        </a>{" "}
        tab, click on <strong>Copy to Clipboard</strong> button. Paste the
        result in the text area below. Select up to 4 characters from the list
        below and click Import Team to finish import.
        <strong className="text-yellow-400">
          This will overwrite any existing team. This action cannot be reversed.
          You have been warned
        </strong>
      </div>

      {err === "" ? (
        <GridView
          chars={chars}
          selected={selected}
          handleSelect={handleSelect}
        />
      ) : (
        "No characters found in Genshin Optimizer export"
      )}

      <div
        className={
          err !== ""
            ? "rounded-md p-2 bg-gray-600 border-red-500 border-2 flex flex-col"
            : "rounded-md p-2 bg-gray-600 flex flex-col"
        }
      >
        <textarea
          rows={5}
          className="bg-transparent whitespace-pre text-xs font-mono w-full"
          placeholder="Paste JSON from Genshin Optimizer here"
          onChange={handleOnChange}
        />
        {err !== "" ? (
          <span className="mt-2 text-red-500">Invalid JSON</span>
        ) : null}
      </div>
    </div>
  );
}
