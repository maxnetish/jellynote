var cachedSessiongetPromise;

const session = {
    /**
     * Cached request
     * @param query
     * @param pagination
     */
    get: function () {

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
    }
};

export {
    session
};