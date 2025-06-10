import './styles/Home.css';
import './styles/QueSom.css';


function QueSom() {
  return (
    <div className="main-container">
      <main className="main-content que-som">
        <h1>QUÈ SOM?</h1>
        <p className="intro-text">
          League of Data (LoD) és la primera pàgina web de visualització de dades d'equips professionals del videojoc League of Legends en català. 
          El propòsit d’aquest projecte és apropar i augmentar la comunitat catalana de l’apartat competitiu del LoL.
        </p>

        <img
          src="/quesom_image1.png"
          alt="Esdeveniment de LoL"
          className="main-image"
        />

        <p className="secondary-text">
          A LoD podràs descobrir les dades competitives més interessants dels teus jugadors i equips preferits.
          <br />
          A més, tindràs l’oportunitat de seguir totes les lligues del Tier 1 junt amb les seves estadístiques sense la necessitat de fer més de tres clics.
        </p>

        <div className="image-row">
          <img
            src="/quesom_image2.png"
            alt="Celebració d’un torneig"
            className="side-image"
          />
          <img
            src="/quesom_estadisticas.png"
            alt="Estadístiques de LoL"
            className="side-image2"
          />
        </div>
      </main>
    </div>
  );
}

export default QueSom;
