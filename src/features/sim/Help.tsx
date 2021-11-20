import { open } from "@tauri-apps/api/shell";
import styled from "styled-components";
import Modal from "react-overlays/Modal";
import ModalBackdrop from "~/src/components/ModalBackdrop";

const StyledModal = styled(Modal)`
  position: fixed;
  width: 65vw;
  z-index: 4000;
  top: 50%;
  left: 50%;
  padding: 20px;
  outline: none;
  transform: translate(-50%, -50%);
`;

export default function Help({
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
      <HelpDetails />
    </StyledModal>
  );
}

function HelpDetails() {
  return (
    <div className="bg-gray-700 p-2 rounded-md shadow edit-content">
      <div className="font-medium items-center text-white title-font mb-4">
        FAQ
      </div>
      <div>
        <strong>How does this thing work?</strong>
        <p>
          The sim runs on a text based config file. For more help on the config
          file itself, see{" "}
          <a
            href="#"
            onClick={() => {
              open("https://github.com/genshinsim/gsim/wiki/Configuration");
            }}
          >
            wiki
          </a>
          .
        </p>
        <p>
          The UI assist with the process of building a config file. On the
          builder tab you can put together your team of characters (and there
          respective weapon, artifacts, etc..). Then click on the Load from
          Builder button to convert that into the text format accepted by the
          sim.
        </p>
        <p>
          Currently there is no UI for assisting with building the action list
          (i.e. what character ability the sim should use in what order). This
          will have to be written in the text format still. For more information
          on the action list itself, see{" "}
          <a
            href="#"
            onClick={() => {
              open("https://github.com/genshinsim/gsim/wiki/Action-List");
            }}
          >
            wiki
          </a>
          .
        </p>
        <p>
          However, you can use an action list someone else has already made.
          Feel free to ask in the sim's discord for help.
        </p>
      </div>
    </div>
  );
}
