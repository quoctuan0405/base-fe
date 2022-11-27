import React, {
  createRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import iro from '@jaames/iro';
import _ from 'lodash';
import { IroColorPicker } from '@jaames/iro/dist/ColorPicker';
import { BehaviorSubject, debounceTime } from 'rxjs';

export interface Props {
  colorLock: boolean;
  activeColorIndex: number;
  colors: string[];
  onChange: (color: string[]) => any;
  onActiveColorIndexChange: (index: number) => any;
}

export const ColorPicker: React.FC<Props> = ({
  colorLock,
  activeColorIndex,
  colors,
  onChange,
  onActiveColorIndexChange,
}) => {
  const colorPicker: MutableRefObject<IroColorPicker | null> =
    useRef<IroColorPicker | null>(null);
  const el: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  const colors$ = useMemo(() => new BehaviorSubject(colors), [colors]);

  useEffect(() => {
    if (colors$) {
      const subs = colors$
        .pipe(debounceTime(40))
        .subscribe((colors) => onChange(colors));

      return () => {
        subs.unsubscribe();
      };
    }
  }, [colors$]);

  useEffect(() => {
    if (!el.current) {
      return;
    }

    if (!colorPicker.current) {
      colorPicker.current = iro.ColorPicker(el.current, {
        colors: colors,
        layout: [
          {
            component: iro.ui.Wheel,
            options: {
              wheelLightness: false,
            },
          },
          {
            component: iro.ui.Slider,
          },
        ],
        handleRadius: 8,
        activeHandleRadius: 11,
      });

      colorPicker.current.setActiveColor(activeColorIndex);

      colorPicker.current.on('input:change', onChangeWrapper);
    }
  }, [colorLock]);

  useEffect(() => {
    if (colorPicker.current === null) {
      return;
    }

    colorPicker.current.off('input:change', onChangeWrapper);
    colorPicker.current.on('input:change', onChangeWrapper);
  }, [colors, colorLock]);

  const onChangeWrapper = (activeColor: IroColorPicker['color']) => {
    if (colorLock) {
      // Calculate hue difference
      const tempColor = activeColor.clone();
      tempColor.set(colors[activeColor.index]);
      const hueDifference = activeColor.hue - tempColor.hue;

      // Update all colors according to hue difference
      const newColors: string[] = [];
      for (let iroColor of colorPicker.current!.colors) {
        if (iroColor.index != activeColor.index) {
          tempColor.set(colors[iroColor.index]);
          iroColor.hue = (tempColor.hue + hueDifference + 360) % 360;
        }

        newColors[iroColor.index] = iroColor.hexString;
      }

      // Update new colors
      colors$.next(newColors);
    } else {
      // Update selected color
      const newColors: string[] = _.clone(colors);
      newColors[activeColor.index] = activeColor.hexString;

      // Update new colors
      colors$.next(newColors);
    }

    onActiveColorIndexChange(activeColor.index);
  };

  return <div ref={el}></div>;
};
