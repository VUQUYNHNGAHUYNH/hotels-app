"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import usePropertiesModal from "../hooks/usePropertiesModal";
import CategoryInput from "../input/CategoryInput";
import CounterInput from "../input/CounterInput";
import CountryInput from "../input/CountryInput";
import ImageUpload from "../input/ImageUpload";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  PRICE = 4,
}

const PropertiesModal = () => {
  const router = useRouter();
  const propertiesModal = usePropertiesModal();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FieldValues>({
      defaultValues: {
        category: "",
        location: "",
        imageSrc: "",
        guestCount: 1,
        roomCount: 1,
        price: 1,
      },
    });

  //  get the current value of the input field
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");
  const price = watch("price");

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    axios
      .post("/api/properties", data)
      .then(() => {
        toast.success("Property created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        propertiesModal.onClose();
      })
      .catch(() => toast.error("Something went wrong!"));
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

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-bold mb-4">
          Where is your place located?
        </div>
        <CountryInput
          value={location}
          onChange={(value) => setCustomeValue("location", value)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-bold mb-4">
          Share some basics about your place?
        </div>
        <CounterInput
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomeValue("guestCount", value)}
        />
        <CounterInput
          title="Rooms "
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomeValue("roomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-bold mb-4">Add a photo of your place</div>
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomeValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-bold mb-4">
          How much do you charge per night?
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="price"
            className="mb-4 text-lg font-medium text-gray-900"
          >
            Price($)
          </label>
          <input
            type="number"
            id="price"
            {...register("price")}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg"
          />
        </form>
      </div>
    );
  }

  return (
    <Modal
      isOpen={propertiesModal.isOpen}
      onClose={propertiesModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : onBack}
      title="Add my properties"
      body={bodyContent}
    />
  );
};

export default PropertiesModal;
