import staticServe from './static-serve';
import messages from './messages';

export default function addRoutes (app) {
    staticServe(app);
    messages(app);
}
