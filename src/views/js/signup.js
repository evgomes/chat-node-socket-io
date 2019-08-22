'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var loader = document.querySelector('.backdrop');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        loader.classList.remove('d-none');
        var data = serialize(e.target);

        axios.post('/cadastro', data)
            .then(function (res) {
                loader.classList.add('d-none');
                var response = { ...res.data };

                alert(response.message);
                if (!response.success) {
                    return;
                }

                window.location.href = '/';
            });
    })
});