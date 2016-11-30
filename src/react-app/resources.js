var cachedSessiongetPromise;

const HeadersAppJson = {
    'Content-Type': 'application/json; charset=utf-8'
};

const jsonSerialize = JSON.stringify;

const session = {
    /**
     * Cached request
     * @param query
     * @param pagination
     */
    get: function sessionGet(force) {

        if (force) {
            cachedSessiongetPromise = null;
        }

        if (cachedSessiongetPromise) {
            return cachedSessiongetPromise;
        }

        cachedSessiongetPromise = fetch('/api/session', {
            method: 'GET',
            body: null,
            headers: {},
            credentials: 'include'
        })
            .then(function (response) {
                return response.json();
            });

        return cachedSessiongetPromise;
    },

    postLogin: function postLogin(data) {
        return fetch('api/session/login', {
            method: 'POST',
            body: jsonSerialize(data),
            headers: HeadersAppJson,
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status < 200 || response.status >= 300) {
                    throw `Login failed. Server says: ${response.status} ${response.statusText}.`;
                }
                return response;
            });
    },

    postLogout: function postLogout() {
        return fetch('api/session/logout', {
            method: 'POST',
            body: null,
            headers: HeadersAppJson,
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status < 200 || response.status >= 300) {
                    throw `Login failed. Server says: ${response.status} ${response.statusText}.`;
                }
                return response;
            });
    }
};

export {
    session
};