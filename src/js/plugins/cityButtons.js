import $ from 'jquery';

import { onLoadHtmlSuccess } from '../core/includes';

const duration = 300;

function filterByCity(city, btn) {
    btn.parent().each(function(_, el) {
        $('button.filter-city').removeClass('active');
        btn.addClass('active');
    });

    $('[wm-city]').each(function(_, el) {
        const isTarget = $(this).attr('wm-city') === city
            || city === null;
        if(isTarget) {
            $(this).parent().removeClass('d-none');
            $(this).fadeIn(duration);
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none');
            });
        }
    })
}

$.fn.cityButtons = function() {
    const cities = new Set;
    $('[wm-city]').each(function(_, el) {
        cities.add($(el).attr('wm-city'));
    });

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-dark', 'filter-city']).html(city);
        btn.click(e => filterByCity(city, btn));
        return btn;
    });

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-dark', 'filter-city', 'active']).html('Todas');
    btnAll.click(e => filterByCity(null, btnAll));
    btns.push(btnAll);

    const btnGroup = $('<div>').addClass(['btn-group']);
    btnGroup.append(btns);

    $(this).html(btnGroup);

    return this;
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons();
});


