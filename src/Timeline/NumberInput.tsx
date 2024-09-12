import {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from "react";
import { roundToStep, clampValue } from "./utils/utils";

type NumberInputProps = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  dataTestId?: string;
  onChange: (value: number) => void;
};

export const NumberInput = ({
  value = 0,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 10,
  dataTestId = "number-input",
  onChange,
}: NumberInputProps) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue.toString());
  const isEscapeBlurRef = useRef(false);

  useEffect(() => {
    if (value.toString() !== inputValue) {
      setInputValue(value.toString());
    }
  }, [value]);

  const formatValue = (value: number): number => {
    if (isNaN(value)) return 0; // handle non-numeric values

    const roundedValue = roundToStep(value);
    const clampedValue = clampValue(roundedValue, min, max);

    return clampedValue;
  };

  const updateValues = (value: number) => {
    // handle invalid inputs (non-numeric)
    if (inputValue.length === 0) {
      setInputValue(value.toString());
      return;
    }

    const formattedValue = formatValue(value);
    setInputValue(formattedValue.toString());
    onChange(formattedValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // handle user typing
    if ((e.nativeEvent as InputEvent).inputType) {
      setInputValue(value);
    } else {
      updateValues(Number(value)); //handle native step buttons
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    switch (e.key) {
      case "ARROW_UP" || "ARROW_DOWN":
        target.select();
        break;
      case "Enter":
        target.blur();
        break;
      case "Escape":
        setInputValue(value.toString());
        isEscapeBlurRef.current = true;
        target.blur();
        break;
      default:
        break;
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleBlur = () => {
    if (isEscapeBlurRef.current) {
      isEscapeBlurRef.current = false;
      return;
    }

    updateValues(Number(inputValue));
  };

  return (
    <input
      className="bg-gray-700 px-1 rounded"
      type="number"
      data-testid={dataTestId}
      value={inputValue}
      min={min}
      max={max}
      step={step}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
