function calc() {
    // calc 
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0,
        starting = 0, //анимашка
        valueTotal = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('keydown', function () {
        onlyNumbersFilter();
    });


    persons.addEventListener('change', function () {
        // Стрелочную функцию нельзя потому что будет this
        personsSum = +this.value;
        callAnimation();
    });

    restDays.addEventListener('keydown', function () {
        onlyNumbersFilter();
    });
    restDays.addEventListener('change', function () { // Стрелочную функцию нельзя потому что будет this
        daysSum = +this.value;
        callAnimation();
    });

    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            // totalValue.innerHTML = a *this.options[this.selectedIndex].value;
            valueTotal = a * this.options[this.selectedIndex].value;
            animateValue("total", starting, valueTotal, 400); // анимашка

        }
    });

    // Я ЗДЕСЬ СДЕЛАЛ КОПИЮ СКРИПТА С POPUP И УБРАЛ + ТАК КАК В СКРИПТЕ POPUP МОЖНО ВВЕСТИ +
    function onlyNumbersFilter() {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
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
    }

    //Анимация TOTAL

    function animateValue(id, start, end, duration) {
        var range = end - start,
            current = start,
            increment = end > start ? 1 : -1,
            stepTime = Math.abs(Math.floor(duration / range) * 10),
            obj = document.getElementById(id),
            timer = setInterval(function () {
                current += increment;
                obj.innerHTML = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, stepTime);
    }

    function callAnimation() {
        if (restDays.value != '' && persons.value != '' && restDays.value != 0 && persons.value != 0) {
            total = (daysSum + personsSum) * 400;
            starting = total - ((total / 100) * 0.5);
            animateValue("total", starting, total, 400); // анимашка
        } else {
            totalValue.innerHTML = 0;
        }
    }
}

module.exports = calc;