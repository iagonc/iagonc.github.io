import ConsolePortfolio from './console-portfolio';
import ProfessionalProfile from './professional-profile';
import { profileStructuredData } from './site-config';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileStructuredData).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />
      <ConsolePortfolio />
      <ProfessionalProfile />
    </>
  );
}
