import { Priorities, IColors } from '@/models/ITask';

interface IProps {
  priority: number;
  size: number;
}

const colors: IColors = {
  high: '#2abc33',
  medium: '#F4B400',
  low: '#e73030',
};

const Circle = ({ priority, size }: IProps) => {
  const priorityKey = Priorities[priority];
  const color = colors[priorityKey];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
    </svg>
  );
};

export default Circle;
