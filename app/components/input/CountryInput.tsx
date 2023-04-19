"use client";

import Select from "react-select";
import useCountries from "../hooks/useCountries";

export type CountriesValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountryProps {
  value?: CountriesValue;
  onChange: (value: CountriesValue) => void;
}

const CountryInput: React.FC<CountryProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountriesValue)}
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-3">
          <div>{option.flag}</div>
          <div>
            {option.label},
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        </div>
      )}
    />
  );
};

export default CountryInput;
