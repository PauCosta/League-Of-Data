import { useTranslation } from 'react-i18next';
import './styles/Home.css';
import './styles/QueSom.css';

function QueSom() {
  const { t } = useTranslation();

  return (
    <div className="main-container">
      <main className="main-content que-som">
        <h1>{t('quesom.title')}</h1>

        <p className="intro-text">
          {t('quesom.intro_text_part1')}
          <br />  <br />
          {t('quesom.intro_text_part2')}
          </p>

        <img
          src="/quesom_image1.png"
          alt={t('quesom.image1_alt')}
          className="main-image"
        />

        <p className="secondary-text">
          {t('quesom.secondary_text_part1')}
          <br />
          {t('quesom.secondary_text_part2')}
        </p>

        <div className="image-row">
          <img
            src="/quesom_image2.png"
            alt={t('quesom.image2_alt')}
            className="side-image"
          />
          <img
            src="/quesom_estadisticas.png"
            alt={t('quesom.image3_alt')}
            className="side-image2"
          />
        </div>
      </main>
    </div>
  );
}

export default QueSom;
