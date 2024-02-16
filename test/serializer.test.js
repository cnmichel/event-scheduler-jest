import EventSerializer from "../src/serializer";
import Event from "../src/models";


describe("Event Serializer",()=> {

    test('Test event serializer', async () => {
        let eventSerializer = new EventSerializer();
        let event = new Event(new Date('2019-12-17T02:24:00Z'), '2019-12-17T13:24:00', "Hello World", "Campus Numerique", "This is an hello world..");
        expect(eventSerializer.serialize(event)).toBe('{"startTime":"2019-12-17T02:24:00.000Z","endTime":"2019-12-17T13:24:00","title":"Hello World","location":"Campus Numerique","description":"This is an hello world.."}');
    })

    test('Test event unserializer', async () => {
        let eventSerializer = new EventSerializer();
        let event = new Event(new Date('2019-12-17T03:24:00Z'), '2019-12-17T13:24:00', "Hello World", "Campus Numerique", "This is an hello world..");
        let serializedEvent = eventSerializer.serialize(event);
        expect(eventSerializer.unserialize(serializedEvent)).toStrictEqual(event);
    })

});