"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import usePropertiesModal from "../hooks/usePropertiesModal";
import CategoryInput from "../input/CategoryInput";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}
const PropertiesModal = () => {
  const propertiesModal = usePropertiesModal();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      imageSrc: "",
      guestCount: 0,
      roomCount: 0,
      price: 0,
      title: "",
      description: "",
    },
  });

  //  get the current value of the input field
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");

  const setCustomeValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create property";
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return;
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">
        Which of these best describes your place?
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-full overflow-y-auto">
        {categories.map((item) => (
          <CategoryInput
            key={item.label}
            onClick={(category) => setCustomeValue("category", category)}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={propertiesModal.isOpen}
      onClose={propertiesModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : onBack}
      title="Add my properties"
      body={bodyContent}
    />
  );
};

export default PropertiesModal;
