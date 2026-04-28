import './Confetti.css';

const COLORS = ['#FFB347', '#6C5CE7', '#FF6B9D', '#00CEC9', '#FFEAA7'];

function Confetti({ count = 30 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </>
  );
}

export default Confetti;
