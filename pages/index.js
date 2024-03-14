import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import React from 'react';
import { apiBaseUrl } from '../lib/constants';
import classnames from 'classnames';
import moment from 'moment-timezone';

// [PDT] Feb 25th, 2024 @ 8:00 AM
const hackStarts = new Date(1708876800 * 1000).getTime();

// [PDT] Feb 25th, 2024 @ 7:00 PM
const hackEnds = new Date(1708916400 * 1000).getTime();

const PACIFIC_TZ = 'America/Los_Angeles';
const localTimezoneName = PACIFIC_TZ;
let localTimezone;
let notPDT;

const HomePage = ({ data }) => {
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [timezone, setTimezone] = React.useState(null);
  const [selectedDay, setSelectedDay] = React.useState(0);
  const [days, setDays] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [openEvent, setOpenEvent] = React.useState(null);

  const [filteredTypes, setFilteredTypes] = React.useState([]);
  const toggleFilteredType = (type) =>
    setFilteredTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));

  const [sections, setSections] = React.useState(null);

  const [filterOpen, setFilterOpen] = React.useState(false);
  const toggleFilter = () => setFilterOpen((prev) => !prev);

  // run on mount
  React.useEffect(() => {
    let interval;
    const updateTimeLeft = () => {
      const countdownEnd = new Date() > hackStarts ? hackEnds : hackStarts;

      // get duration in seconds
      const durationLeft = Math.round((countdownEnd - new Date().getTime()) / 1000);

      const days = Math.floor(durationLeft / (60 * 60 * 24));

      let durationRemainder = durationLeft % (60 * 60 * 24);
      const hours = Math.floor(durationRemainder / (60 * 60));

      durationRemainder %= 60 * 60;
      const minutes = Math.floor(durationRemainder / 60);

      durationRemainder %= 60;
      const seconds = Math.ceil(durationRemainder);

      const time = [days, hours, minutes, seconds].join(':');
      // zero pad all at once (replace single digits with 0#)
      const paddedTime = time.replace(/\b\d\b/g, '0$&');
      setTimeLeft(paddedTime);

      // if hack ended, stop updating
      if (new Date() > hackEnds) clearInterval(interval);
    };

    updateTimeLeft();
    fetchSchedule();

    interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchSchedule = (tz = localTimezoneName) => {
    // load
    const { days, types, today, sections, timezone } = data;
    // TODO: jank temp fix for calhacks api making days + 1
    const offsetSections = sections.map((section) => ({ ...section, day: section.day }));

    setDays(days);
    setTypes(types);
    setFilteredTypes(types);
    setTimezone(timezone);
    setSections(offsetSections);

    // if today is in correct range, select that day, else default to first
    setSelectedDay(today >= 0 && today <= days.length - 1 ? today : 0);

    if (new Date() < hackStarts) {
      setSelectedDay(0);
    }
  };

  const renderSection = (section) => {
    const { startTime, startValue, events } = section;

    return (
      <div className="section" key={startValue}>
        <div className="section-label">{startTime}</div>

        <div className="section-events">
          {events
            .filter(({ type }) => filteredTypes.includes(type))
            .map((event) => (
              <div
                className="event"
                key={startValue + event.title + event.host + event.type + event.url + event.location}
                onClick={() => setOpenEvent(event)}
              >
                <div className="desktop">
                  <p className="event-title">{event.title}</p>
                  <div className="event-host">
                    <p>{event.host}</p>
                  </div>
                  <p className="event-type">{event.type}</p>
                  {!!event.location && (
                    <div className="event-location">
                      {event.url ? (
                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                          {event.location}
                        </a>
                      ) : (
                        <p>{event.location}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="mobile">
                  <div className="event-titles">
                    <p className="event-title">{event.title}</p>
                    <p className="event-type-host">
                      {event.type} | {event.host}
                    </p>
                  </div>
                  {event.location ? (
                    event.url ? (
                      <a className="event-location" href={event.url} target="_blank" rel="noopener noreferrer">
                        {event.location}
                      </a>
                    ) : (
                      <p className="event-location">{event.location}</p>
                    )
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const hackOver = new Date() > hackEnds;
  const hackStarted = new Date() > hackStarts;
  const dynamicKeywordSelection = !hackStarted ? 'Hacking' : 'Submissions';

  return (
    <>
      <Header />

      <div id="splash">
        <h2>Welcome to the Hack for Impact!</h2>
        <img id="bigbear" src="https://calhacks-sierra.s3.us-west-2.amazonaws.com/assets/live/bigbear.svg" alt="bear" />

        <h2>
          {hackOver
            ? 'Hacking has ended'
            : `${dynamicKeywordSelection} ${new Date() > hackStarts ? 'due' : 'starts'} in`}
        </h2>
        {!hackOver && <h1>{timeLeft}</h1>}

        <i
          id="down-indicator"
          className="material-icons"
          onClick={() =>
            document.getElementById('schedule').scrollIntoView({
              behavior: 'smooth',
            })
          }
        >
          keyboard_arrow_down
        </i>
      </div>

      <div id="schedule">
        <div id="schedule-header">
          <div id="header-primary">
            <h2>Schedule</h2>

            <div id="filter">
              <div id="filter-select" onClick={toggleFilter}>
                <p>Filter ({filteredTypes.length})</p>
                <i className="material-icons">arrow_drop_down</i>
              </div>

              {filterOpen && (
                <div id="filter-window">
                  <p>Type</p>

                  {types.map((type) => (
                    <div key={type} className="picker">
                      <p
                        onClick={() => toggleFilteredType(type)}
                        className={classnames({ selected: filteredTypes.includes(type) })}
                      >
                        {type}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="spacer"></div>

          <div id="day-picker" className="picker">
            {days.map((day, index) => (
              <p
                key={day}
                onClick={() => setSelectedDay(index)}
                className={classnames({ selected: index === selectedDay })}
              >
                {day}
              </p>
            ))}
          </div>

          <div id="tz-picker" className="picker">
            {notPDT && (
              <p onClick={() => fetchSchedule()} className={classnames({ selected: timezone === localTimezone })}>
                {localTimezone}
              </p>
            )}
            <p
              onClick={() => notPDT && fetchSchedule(PACIFIC_TZ)}
              className={classnames({ selected: timezone === 'PDT', only: !notPDT })}
            >
              PDT
            </p>
          </div>
        </div>

        <div id="schedule-labels">
          <p id="label-time">Time</p>
          <p id="label-event">Event</p>
          <p id="label-host">Host</p>
          <p id="label-type">Type</p>
          <p id="label-location">Location</p>
        </div>

        <div id="sections">
          {sections ? (
            sections
              .filter(
                ({ day, events }) =>
                  // section is on selected day
                  day === selectedDay &&
                  // at least one event included in type filter
                  events.some(({ type }) => filteredTypes.includes(type))
              )
              .map((section) => renderSection(section))
          ) : (
            <Loader />
          )}
        </div>
      </div>

      <Footer />

      {!!openEvent && (
        <div
          id="open-event-container"
          onClick={(e) => {
            if (e.target.id === 'open-event-container') {
              setOpenEvent(null);
            }
          }}
        >
          <div>
            <div id="open-event-header">
              <h1 style={{ fontSize: '15px' }}>{openEvent.title}</h1>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEvent(null);
                }}
                className="material-icons"
              >
                close
              </i>
            </div>

            <p id="open-event-host">{openEvent.host}</p>
            {!!openEvent.description && <p>{openEvent.description}</p>}

            {openEvent.url ? (
              <p>
                {!!openEvent.location.includes('&') && openEvent.location.split('&')[0] + ' & '}
                <a href={openEvent.url} target="_blank" rel="noopener noreferrer">
                  {openEvent.location.includes('&') ? openEvent.location.split('&')[1].trim() : openEvent.location}
                </a>
              </p>
            ) : (
              <p>{openEvent.location}</p>
            )}
            <p id="open-event-time">{openEvent.time}</p>
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch(`${apiBaseUrl}/live/schedule?tz=${localTimezoneName}`)
    const data = await res.json();

    return {
      props: {
        data,
      },
      revalidate: 60, // Re-generate page after 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}

export default HomePage;
