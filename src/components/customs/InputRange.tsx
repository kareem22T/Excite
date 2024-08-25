import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  onChange: (values: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, onChange }) => {
  const [values, setValues] = useState<[number, number]>([min, max]);

  const handleChange = (newValues: number[]) => {
    if (newValues.length === 2) {
      setValues(newValues as [number, number]);
      onChange(newValues as [number, number]);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '20px' }}>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', 'black', '#ccc'],
                  min: min,
                  max: max
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '24px',
              width: '24px',
              borderRadius: '50%',
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: 'black'
              }}
            />
          </div>
        )}
      />
      <output style={{ marginTop: '8px', color: 'black', display: 'flex', justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span>{values[0]}</span> <span>{values[1]}</span>
      </output>
    </div>
  );
};

export default RangeSlider;
