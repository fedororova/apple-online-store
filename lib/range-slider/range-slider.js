const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [500, 500000],
        connect: true,
        step: 1,
        range: {
            'min': [500],
            'max': [500000]
        }
    });

    const priceTo = document.getElementById('priceTo');
    const priceFrom = document.getElementById('priceFrom');
    const filters = [priceTo, priceFrom];

    rangeSlider.noUiSlider.on('update', function (values, handle) {
        filters[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
        let arrSlider = [null, null];
        arrSlider[i] = value;
        rangeSlider.noUiSlider.set(arrSlider);
    }

    filters.forEach((el, index) => {
        el.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value);
        });

    });
}




