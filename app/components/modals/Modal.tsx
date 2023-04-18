"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

type ModalProps = {
  isOpen?: boolean;
  onSubmit: () => void;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryActionLabel?: () => void;
  secondaryLabel?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  title,
  body,
  actionLabel,
  disabled,
  secondaryLabel,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryLabel || !secondaryActionLabel) {
      return;
    }
    secondaryActionLabel();
  }, [disabled, secondaryLabel, secondaryActionLabel]);

  if (!isOpen) return null;
  return (
    <div className="flex justify-center items-center overflow-hidden z-50 fixed inset-0 bg-slate-600/80 ">
      <div className="w-full lg:w-3/5 xl:w-2/5 mx-auto h-full lg:h-auto flex items-center justify-center">
        <div
          className={`flex flex-col rounded-lg shadow-lg bg-white translate duration-300
        ${
          showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
        `}
        >
          {/* header */}
          <div className="relative flex items-center justify-center p-6 border-b">
            <IoMdClose
              size={20}
              onClick={handleClose}
              className="absolute left-9 hover:text-yellow-600 cursor-pointer"
            />
            <div className="text-2xl font-semibold text-yellow-600">
              {title}
            </div>
          </div>
          {/* body */}
          <div className="relative p-6 flex-auto">{body}</div>
          {/* button */}
          <div className="flex items-center w-full gap-4 p-4">
            {secondaryLabel && secondaryActionLabel && (
              <Button
                outline
                disabled={disabled}
                label={secondaryLabel}
                onClick={handleSecondaryAction}
              />
            )}

            <Button
              disabled={disabled}
              label={actionLabel}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
