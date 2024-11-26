function Jauge({ decibels }: { decibels: number }) {
  // Limiter les décibels à un maximum de 50 pour la jauge
  const decibelPercentage = Math.min(Math.max((decibels / 50) * 100, 0), 100);

  let gradient = "green"; // Par défaut, vert
  if (decibels >= 10 && decibels < 20) {
    gradient = "linear-gradient(to top, green, yellow)";
  } else if (decibels >= 20 && decibels < 30) {
    gradient = "linear-gradient(to top, yellow, orange)";
  } else if (decibels >= 30) {
    gradient = "linear-gradient(to top, orange, red)";
  }


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
          style={{
            height: `${decibelPercentage}%`,
            background: gradient, 
            transition: "height 0.1s ease, background 0.1s ease",  
            }}
        ></div>
      </div>
    </div>
  );
}

export default Jauge;