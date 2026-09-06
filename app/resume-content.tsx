import {
  credentials,
  education,
  experience,
  professionalSummary,
} from './portfolio';
import { technicalToolkit } from './technical-toolkit';

export default function ResumeContent() {
  return (
    <div className="resume-content">
      <h2>Profile</h2>
      <p>{professionalSummary}</p>
      <h2 id="work-history">Work experience</h2>
      {experience.map((job, index) => (
        <section className="resume-job" id={job.id} key={job.id}>
          <span className="resume-file-number" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3>{job.title}</h3>
            <span>{job.period}</span>
          </div>
          <p className="resume-role">{job.fullRole}</p>
          <ul>
            {job.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="resume-technologies">
            <strong>Technologies: </strong>
            {job.technologies.join(', ')}.
          </p>
        </section>
      ))}
      <h2 id="resume-toolkit">Technical toolkit</h2>
      {technicalToolkit.map((group) => (
        <p key={group.title}>
          <strong>{group.title}: </strong>
          {group.items.join(', ')}.
        </p>
      ))}
      <h2>Education</h2>
      <h3>{education.institution}</h3>
      <p>
        {education.program} · {education.period}
        <br />
        {education.status}
      </p>
      <p>{education.detail}</p>
      <h2>Certifications & professional training</h2>
      <ul>
        {credentials.map((credential) => (
          <li key={credential}>{credential}</li>
        ))}
      </ul>
      <h2>Languages</h2>
      <p>Portuguese (native) · English (advanced)</p>
    </div>
  );
}
