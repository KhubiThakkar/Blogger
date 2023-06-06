import { Link } from 'react-router-dom';
import Experience from '../components/Experience';

export default function Portfolio() {
  return (
    <div className="portfolio">
      <div className="intro">
        <img src={`${process.env.REACT_APP_BASE_URL}/uploads/profilePhoto.jpeg`} alt="/"></img>
        <div>
          <h1>Khubi Thakkar</h1>
          <p>
            Passionate and accomplished software engineer with a distinguished track record spanning two years,
            dedicated to the art of designing, developing, implementing, and maintaining sophisticated software
            solutions across a diverse range of technologies. Fueled by an unyielding drive for excellence, I am now
            poised to harness my invaluable experience in a stimulating and fruitful work environment, where I can make
            significant contributions and continuously push the boundaries of innovation.
          </p>
        </div>
      </div>

      <div className="jobDesc">
        <h1>Work Experience</h1>
        <Experience
          company={'Tata Consultancy Services'}
          jobRole={'Full Stack Developer'}
          timeperiod={'Aug 2021 - Present'}
          description={
            <ul>
              <li>
                Played a pivotal role in designing, developing, and testing medium-scale web applications for the
                Pharmaceutical domain, employing technologies such as Node, React, PostgreSQL
              </li>
              <li>
                Ensured seamless deployment and ongoing maintenance of applications through the proficient utilization
                of Heroku and AWS pipelines.
              </li>
              <li>Conducted thorough testing and debugging to ensure high-quality, bug-free code. </li>
              <li>
                Stayed up-to-date with industry trends and implemented best practices to optimize performance and
                security
              </li>
            </ul>
          }
        />
        <Experience
          company={'L&T Technology Services'}
          jobRole={'Engineer Trainee'}
          timeperiod={'May 2021 - July 2021'}
          description={
            <ul>
              <li>
                Underwent extensive training in Java, Object-Oriented Programming (OOPs), C Language, SDLC, Python,
                Embedded C, and Drivers.
              </li>
              <li>
                Developed projects encompassing each module and successfully delivered them within designated timelines
              </li>
              <li>
                Developed projects encompassing each module and successfully delivered them within designated timelines
              </li>
              <li>
                Developed projects encompassing each module and successfully delivered them within designated timelines
              </li>
            </ul>
          }
        />
        <Experience
          company={'Electrike'}
          jobRole={'Engineer Intern'}
          timeperiod={'April 2020 - July 2020'}
          description={
            <ul>
              <li>Worked on integration of solar panels on the charging system of the E-bike</li>
              <li>Assisted in Designing of MPPT Solar Charge Controller</li>
              <li>Helped reduce the cost of the Solar Panel system by 15%.</li>
              <li>Helped reduce the cost of the Solar Panel system by 15%.</li>
            </ul>
          }
        />
        <Experience
          company={'GiPiTronix'}
          jobRole={'Engineer Intern'}
          timeperiod={'April 2019 - July 2019'}
          description={
            <ul>
              <li>
                Underwent extensive training in Java, Object-Oriented Programming (OOPs), C Language, SDLC, Python,
                Embedded C, and Drivers.
              </li>
              <li>
                Developed projects encompassing each module and successfully delivered them within designated timelines
              </li>
              <li>
                Developed projects encompassing each module and successfully delivered them within designated timelines
              </li>
              <li>
                Developed projects encompassing each module and successfully delivered them within designated timelines
              </li>
            </ul>
          }
        />
      </div>

      <div className="parallelTabs">
        <div className="projects">
          <h1>Projects</h1>
          <Experience
            company={'Stock Portfolio Tracker'}
            jobRole={'NodeJS, ReactJS, MongoDB'}
            description={
              ' Designed web application to help users to track their portfolio across various brokers with user authentication and data security. Simple and intuitaive user inteface.'
            }
          />
          <Experience
            company={'Smart Fuel Theft Detector'}
            jobRole={'Embedded C'}
            description={
              'System developed to monitor the fuel levels in tanks to help reduce the fuel pilfering in the logistics industry.'
            }
          />
          <Experience
            company={'Digital Modulation Learning Tool'}
            jobRole={'Python'}
            description={
              'Made a program oriented towards easier understanding of Analog to Digital and Digital to Digital Modulation for students. Plotted graphs to help visualize the modulation results using pbPlots library'
            }
          />
        </div>
        <div className='skills'>
          <h1>Skills</h1>
          <div>
            <h2>JavaScript</h2>
            <p>ES6 Features, AJAX and Fetch API, Async/ Await, Promises, Local storage and cookies</p>
          </div>
          <div>
            <h2>Node.js</h2>
            <p>Express, JWT, Redis, Bycrpt, Socket.io, Mongoose, Axios, Sequelize, GraphQL</p>
          </div>
          <div>
            <h2>React.js</h2>
            <p>React Router, Redux, Material UI, Context API</p>
          </div>
          <div>
            <h2>MongoDB, PostgreSQL</h2>
          </div>
        </div>
      </div>

      <div className="jobDesc">
        <h1>Education</h1>
        <Experience
          company={"Bachelor's of Engineering"}
          jobRole={'Maharaja Sayajirao University of Baroda'}
          timeperiod={'June 2017 - June 2021'}
          description={
            <ul>
              <li>Bachelor's of Engineering in Electronics with a specialization in Instrumentation.</li>
              <li>Achieved first-class distinction and an impressive CGPA of 8.7.</li>
              <li>
                Founding member of the ISEE club, dedicated to guiding students in preparation for placements,
                organizing industrial visits, and facilitating technical lectures within the department.
              </li>
              <li>
                Actively volunteered at Paramarsh, a non-technical event, contributing to fundraising efforts and
                assisting with event management.
              </li>
            </ul>
          }
        />
        <Experience
          company={'Higher Secondary School Certificate (HSC)'}
          jobRole={'Baroda High School, ONGC'}
          timeperiod={'April 2016 - May 2017'}
        />
        <Experience
          company={'Secondary School Certificate (SSC) '}
          jobRole={'Ambe School, Baroda'}
          timeperiod={'April 2014 - May 2015'}
        />
      </div>
    </div>
  );
}
