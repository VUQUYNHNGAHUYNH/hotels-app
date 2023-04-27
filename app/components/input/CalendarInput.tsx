import { RangeKeyDict, Range, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type CalendarInputProps = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};

const CalendarInput: React.FC<CalendarInputProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#ca8a04"]}
      ranges={[value]}
      onChange={onChange}
      direction="vertical"
      date={new Date()}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default CalendarInput;
