import Event from "../src/models";
import EventRepository, { InMemoryEventRepository } from "../src/repository";

describe("Event Repository",()=> {

  let eventBuilder = () => [
    new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
    new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
    new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world..")
  ];

  test('getAll shall return all the events from the db', async () => {
    const events = eventBuilder();
    const repository = new EventRepository(new InMemoryEventRepository(events));
    expect(repository.getAll().length).toBe(3);
  })

  test('add shall add a new event to the db', async () => {
    const events = eventBuilder();
    const repository = new EventRepository(new InMemoryEventRepository(events));
    const event = new Event(new Date('2024-02-01T09:00:00'), new Date('2024-02-01T19:00:00'), "Fresh event", "Campus", "This is a freshly created event");
    repository.add(event);
    expect(repository.getAll().length).toBe(4);
  })

  test('add shall not add a new event if content is null', async () => {
    const events = eventBuilder();
    const repository = new EventRepository(new InMemoryEventRepository(events));
    const event = null;
    repository.add(event);
    expect(repository.getAll().length).toBe(3);
  })
});