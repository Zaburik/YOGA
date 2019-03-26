function forms(){
    //form
    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        feedbackForm = document.querySelector('#form'),
        phoneInput = document.querySelectorAll('#phone');

    var popupWindow = document.querySelector('.popup-form'),
        img = document.createElement("IMG");
    img.classList.add('status');


    form.addEventListener('submit', (event) => {
        json(form);
        checkingJson();
    });

    feedbackForm.addEventListener('submit', (event) => {
        json(feedbackForm);
        checkingJson();
    });


    function json(name) {
        event.preventDefault();
        return new Promise(function (resolve, reject) {

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); // Метод для JSON

            let formData = new FormData(name); // здесь мы получаем всю информацию который написал пользователь 

            let obj = {}; // этот пункт нужен для Json. 
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            let json = JSON.stringify(obj); //превращает обычный JS объект в JSON файл

            request.send(json);
            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) {
                    resolve();
                } else if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    //Check promise
    function checkingJson() {
        json(name)
            .then(() => {
                overlay.style.display = "block";
                document.body.style.overflow = "hidden";
                form.style.display = "none";
                popupWindow.appendChild(img);
                img.src = "/img/Preloader_4.gif";
            })
            .then(() => {
                img.src = "/img/thanks.png";
                imgSettings();
            })
            .catch(() => {
                img.src = "/img/fail.png";
                imgSettings();
            })
            .then(() => {
                cleanInputs();
            })
    }

    //clean inputs
    function cleanInputs() {
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }


    //options for imgs after sending
    function imgSettings() {
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
        form.style.display = "none";
        popupWindow.appendChild(img);
        setTimeout(() => {
            popupWindow.removeChild(img);
            overlay.style.display = "none";
            document.body.style.overflow = "";
        }, 3000);
    }


    // options for inputs after sending
    phoneInput.forEach(function (item) {
        item.addEventListener('keydown', (event) => {
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 107 ||
                // Разрешаем: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Разрешаем: home, end, влево, вправо
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // Ничего не делаем
                input = "";

            } else {
                // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });

    });


}

module.exports = forms;