import { styled } from '@mui/system';

const Wrapper = styled('div')({
  position: 'absolute',
  top: '8px',
  left: '8px',
  color: 'white',
  backgroundColor: 'grey',
  borderRadius: '5px',
});

const Time = styled('span')({
  padding: '5px',
  fontWeight: 'bold',
});

interface DurationProps {
  duration: number;
}

const Duration = ({ duration }: DurationProps) => {
  const m = Math.floor((duration % 3600) / 60)
    .toString()
    .padStart(1, '0');
  const s = Math.floor(duration % 60)
    .toString()
    .padStart(2, '0');

  const time = m + ':' + s;

  return (
    <Wrapper>
      <Time>{time}</Time>
    </Wrapper>
  );
};

export default Duration;
