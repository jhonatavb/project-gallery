import $ from 'jquery';

const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback);
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body';
    $(parent).find('[wm-include]').each(function(_, el) {
        const url = $(el).attr('wm-include');
        $.ajax({
            url,
            success(data) {
                $(el).html(data);
                $(el).removeAttr('wm-include');

                loadHtmlSuccessCallbacks.forEach(callback => callback(data));
                loadIncludes(el);
            }
        });
    });
}

loadIncludes();

