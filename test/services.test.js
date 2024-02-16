import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");


describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 3 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })

    test('getFirstEvent shall return the oldest starting date event', async() => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent().startTime).toStrictEqual(new Date('2018-12-17T03:24:00'));
    })

    test('getLastEvent shall return the newest starting date event', async() => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent().startTime).toStrictEqual(new Date('2020-04-01T09:00:00'));
    })

    test('getLongestEvent shall return the longest event', async() => {
        let eventService = new EventService(new EventRepository());
        const expectedTime = new Date('2019-12-17T13:24:00') - new Date('2019-12-17T03:24:00')
        const longestEvent = eventService.getLongestEvent()
        expect(longestEvent.endTime - longestEvent.startTime).toStrictEqual(expectedTime);
    })

    test('getShortestEvent shall return the shortest event', async() => {
        let eventService = new EventService(new EventRepository());
        const expectedTime = new Date('2020-04-01T17:00:00') - new Date('2020-04-01T09:00:00')
        const shortestEvent = eventService.getShortestEvent()
        expect(shortestEvent.endTime - shortestEvent.startTime).toStrictEqual(expectedTime);
    })

    test('getEventByTitle shall return an event with the specified title', async() => {
        let eventService = new EventService(new EventRepository());
        const event = eventService.getEventByTitle("Hello World");
        expect(event.title).toBe("Hello World");
    })

    test('getCurrentEvents shall return events for the current date', async() => {
        let eventService = new EventService(new EventRepository());
        const events = eventService.getCurrentEvents();
        expect(events).toStrictEqual([]);
    })
});