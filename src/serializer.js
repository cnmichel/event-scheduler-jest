import Event from "./models"

export default class EventSerializer {
    /**
     *
     * @param {Event| Event[]} event
     * @return {string}
     */
    serialize(event){
        return JSON.stringify(event);
    }

    /**
     *
     * @return {Event | Event[]}
     * @param {string} event
     */
    unserialize(event){
        const parsedEvent = JSON.parse(event);
        const unserializedEvent = new Event();

        unserializedEvent.setStartTime(new Date(parsedEvent.startTime));
        unserializedEvent.setEndTime(parsedEvent.endTime);
        unserializedEvent.setTitle(parsedEvent.title);
        unserializedEvent.setLocation(parsedEvent.location);
        unserializedEvent.setDescription(parsedEvent.description);

        return unserializedEvent;
    }
}