'use strict';

function serialize(form) {
    return Array.from(new FormData(form)
                .entries())
                .reduce(function (response, current) {
                    response[current[0]] = current[1];
                    return response
                }, {})
};