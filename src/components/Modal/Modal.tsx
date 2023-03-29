import { PropsWithChildren } from "react";
import CancelIcon from "../../icons/CancelIcon";
import "./Modal.css";

interface ModalProps {
	title: string;
	show: boolean;
	onClose: () => void;
}

export default function Modal({
	onClose,
	show,
	title,
	children,
}: PropsWithChildren<ModalProps>) {
	return (
		<>
			{show && (
				<div className="modal">
					<div className="modal-content">
						<h1 className="font-bold pb-2">{title}</h1>
						<button className="modal-close-button" onClick={onClose}>
							<CancelIcon />
						</button>
						{children}
					</div>
				</div>
			)}
		</>
	);
}
