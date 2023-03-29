import { PropsWithChildren, useEffect, useState } from "react";
import CancelIcon from "../../icons/CancelIcon";
import "./Modal.css";

type Props = { title: string, show: boolean, onClose: () => void };

function Modal(props: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(props.show);

  console.log('isOpen:', isOpen);

  useEffect(() => {
    setIsOpen(props.show);
  }, [props.show]);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1 className="font-bold pb-2">{props.title}</h1>
            <span className="modal-close-button" onClick={(e) => props.onClose()}><CancelIcon /></span>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;