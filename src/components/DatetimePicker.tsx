import { FC } from 'react';
import Flatpickr from "react-flatpickr";
import { BaseOptions } from 'flatpickr/dist/types/options';
import "flatpickr/dist/themes/airbnb.css";

type Props = {
  value: Date | undefined
  name: string
  required: boolean
  options: Partial<BaseOptions>
  onChange: (e: any) => void
};

const DateTimePicker: FC<Props> = ({
  value,
  name,
  required,
  options,
  onChange,
}) => {
  return (
    <Flatpickr
      data-enable-time
      autoComplete="off"
      autoCorrect="off"
      name={name}
      style={{ padding: '0.2em 0.5em', width: '100%', borderRadius: '5px', borderWidth: '1px' }}
      required={required}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export default DateTimePicker
