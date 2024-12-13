import classes from './Input.module.css';
import clsx from 'clsx';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The minimum value. */
  min?: number;

  ariaLabel?: string;
}

export const Input = ({ min, ariaLabel, ...restProps }: IProps) => {
  return (
    <input
      aria-label={ariaLabel}
      className={clsx('bold', classes.input)}
      type="number"
      defaultValue={min}
      min={min}
      {...restProps}
    ></input>
  );
};
