export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
        const events = this._eventRepository.getAll();
        // Sort events from the newest to the oldest
        const sortedEvents = events.sort((e1, e2) => {
            return (e1.startTime > e2.startTime) ? 1 : (e1.startTime < e2.startTime) ? -1 : 0;
        });

        return sortedEvents.shift();
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        const events = this._eventRepository.getAll();
        // Sort events from the oldest to the newest
        const sortedEvents = events.sort((e1, e2) => {
            return (e1.startTime > e2.startTime) ? -1 : (e1.startTime < e2.startTime) ? 1 : 0;
        });

        return sortedEvents.shift();
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        const events = this._eventRepository.getAll();
        // Sort events from the longest to the shortest
        const sortedEvents = events.sort((e1, e2) => {
            return ((e1.endTime - e1.startTime) > (e2.endTime - e2.startTime)) ? -1
              : ((e1.endTime - e1.startTime) < (e2.endTime - e2.startTime)) ? 1 : 0
        });
        // Filtering out all events with invalid timeframe
        const filteredEvents = this.getValidEvents(sortedEvents);
        return filteredEvents.shift();
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        const events = this._eventRepository.getAll();
        // Sort events from the longest to the shortest
        const sortedEvents = events.sort((e1, e2) => {
            return ((e1.endTime - e1.startTime) > (e2.endTime - e2.startTime)) ? 1
              : ((e1.endTime - e1.startTime) < (e2.endTime - e2.startTime)) ? -1 : 0
        });
        // Filtering out all events with invalid timeframe
        const filteredEvents = this.getValidEvents(sortedEvents);
        return filteredEvents.shift();
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        const events = this._eventRepository.getAll();
        return events.find((event) => event.title === title);
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getValidEvents(events) {
        return events.filter((event) => event.endTime - event.startTime >= 0);
    }
    
}