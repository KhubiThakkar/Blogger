export default function Experience({ company, timeperiod, jobRole, description }) {
  return (
    <div className="experience">
      <h2>{company}</h2>
      <h3>{jobRole}</h3>
      <p className="timeperiod">{timeperiod}</p>
      <p className="description">{description}</p>
    </div>
  );
}
