import $ from 'jquery';

function loadIncludes(parent) {
    if(!parent) parent = 'body';
    $(parent).find('[wm-include]').each(function(_, el) {
        const url = $(el).attr('wm-include');
        $.ajax({
            url,
            success(data) {
                $(el).html(data);
                $(el).removeAttr('wm-include');

                loadIncludes(el);
            }
        });
    });
}

loadIncludes();

