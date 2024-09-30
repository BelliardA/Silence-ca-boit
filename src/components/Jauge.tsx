import './Jauge.css';

function Jauge({ decibels }: { decibels: number }) {
  // Limiter les décibels à un maximum de 50 pour la jauge
  const decibelPercentage = Math.min(Math.max((decibels / 50) * 100, 0), 100);

  return (
    <div className="jauge-container">
      <div className="jauge-echelle">
        <div>50 dB</div>
        <div>40 dB</div>
        <div>30 dB</div>
        <div>20 dB</div>
        <div>10 dB</div>
        <div>0 dB</div>
      </div>

      <div className="jauge">
        <div
          className="jauge-interieur"
          style={{ height: `${decibelPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Jauge;