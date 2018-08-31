import on from './on';
import off from './off';

export default function listen(node, eventName, handler, capture) {
    on(node, eventName, handler, capture);
    return () => {
        off(node, eventName, handler, capture);
    }
}