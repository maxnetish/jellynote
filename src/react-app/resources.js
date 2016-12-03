var cachedSessiongetPromise = null;

const HeadersAppJson = {
    'Content-Type': 'application/json; charset=utf-8'
};

const jsonSerialize = JSON.stringify;

const session = {
    /**
     * Clear cached context,
     * context will refetch from server with next session.get()
     */
    clear: function () {
        cachedSessiongetPromise = null;
    },

    /**
     * Cached request
     * @param query
     * @param pagination
     */
    get: function sessionGet() {
        if (cachedSessiongetPromise) {
            return cachedSessiongetPromise;
        }

        cachedSessiongetPromise = fetch('/api/session', {
            method: 'GET',
            body: null,
            headers: {},
            credentials: 'include'
        })
            .then(response => response.json());

        return cachedSessiongetPromise;
    },

    postLogin: function postLogin(data) {
        return fetch('/api/session/login', {
            method: 'POST',
            body: jsonSerialize(data),
            headers: HeadersAppJson,
            credentials: 'include'
        })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw `Login failed. Server says: ${response.status} ${response.statusText}.`;
                }
                return response;
            });
    },

    postLogout: function postLogout() {
        return fetch('/api/session/logout', {
            method: 'POST',
            body: null,
            headers: HeadersAppJson,
            credentials: 'include'
        })
            .then(response => {
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