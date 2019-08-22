'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const loader = document.querySelector('.backdrop');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        loader.classList.remove('d-none');
        const data = serialize(e.target);

        axios.post('/', data)
            .then(function (res) {
                loader.classList.add('d-none');
                const response = { ...res.data };

                if (!response.success) {
                    alert(response.message);
                    return;
                }

                window.location.href = '/chat';
            });
    });
});