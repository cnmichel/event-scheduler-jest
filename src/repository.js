/**
 * The event repository is responsible of events storage from database
 */
export default class EventRepository {

    _dbDriver;

    constructor(dbDriver) {
        this._dbDriver = dbDriver
    }

    /**
     * Get all events saved in db
     * @return Event[]
     */
    getAll(){
        return this._dbDriver.getAll();
    }

    /**
     * Add a new event
     * return true if succeed
     * @return boolean
     */
    add(event){
        if (event !== null) {
            this._dbDriver.add(event);
            return true
        } else {
            return false;
        }
    }
}

export class InMemoryEventRepository extends EventRepository{
    _events;

    constructor(events) {
        super(null);
        this._events = events;
    }


    getAll() {
        return this._events.slice();
    }

    add(event) {
        this._events.push(event);
    }
}