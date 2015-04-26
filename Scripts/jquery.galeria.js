; (function ($) {

    var total_pages = 0,
        atual_page = 1,
        total_items = 0,
        width_item = 90,
        items_page = 6,
        max_items_page = 6,
        nav_items_obj = null,
        nav_items_obj_childs = null,
        nav_items_obj_position = 0,
        nav_items_obj_position_aux = 0,

        item_selected = null,
        item_selected_index = null;


    $.fn.galeria = function (options) {

        var settings = $.extend({
            items_page: 6
        }, options);

        return this.each(function () {

            var $this = this;

            //thumbs
            nav_items_obj = $(".nav-thumbs > ul", $this);
            nav_items_obj_childs = nav_items_obj.children("li");

            //thumbs pagination
            items_page = settings.items_page;
            total_items = nav_items_obj_childs.length;
            total_pages = Math.ceil(total_items / items_page);
            width_item = nav_items_obj_childs.width();

            //thumb link selection
            item_selected = nav_items_obj_childs.first().children().first();
            item_selected_index = nav_items_obj_childs.first().index();
            item_selected.addClass("selected");            

            //navigation thumbs prev
            $(".nav-control.prev", $this).on("click", function () {
                navThumbs("prev");
            });

            //navigation thumbs next
            $(".nav-control.next", $this).on("click", function () {
                navThumbs("next");
            });

            //item thumb click/select
            $(".nav-thumbs a", $this).on("click", function (e) {
                e.preventDefault();
                selectItem($(this));
            });

            initThumbPage($this);

        });

    };

    function initThumbPage(obj) {
        var position = calculeNavThumbsPosition("");
        nav_items_obj.css("margin-left", position + "px");
        nav_items_obj_position = position;
        setContent();
    };

    function navThumbs(nav) {
        
        var position;

        switch(nav) {
            case "prev":
                if (atual_page > 1) {
                    position = nav_items_obj_position + calculeNavThumbsPosition(nav);
                    nav_items_obj.animate({
                        "margin-left": position + "px"
                    });

                    nav_items_obj_position = position;
                    atual_page--;
                }

                break;
            case "next":
                if (atual_page < total_pages) {
                    position = nav_items_obj_position - calculeNavThumbsPosition(nav);
                    nav_items_obj.animate({
                        "margin-left": position + "px"
                    });

                    nav_items_obj_position = position;
                    atual_page++;
                }
                
                break;
            default:
                break;
        }

        return false;
    };


    function calculeNavThumbsPosition(nav) {

        var position,
            init_position,
            pages_diference = total_pages - atual_page,
            items_diference = 0,
            atual_item = atual_page * items_page;

        switch (nav) {
            case "prev":
                if (pages_diference == 0) {
                    position = nav_items_obj_position_aux * width_item;
                }
                else {
                    position = items_page * width_item;
                }
                break;
            case "next":
                if (pages_diference == 1) {
                    items_diference = total_items - atual_item;
                    position = items_diference * width_item;

                    nav_items_obj_position_aux = items_diference;
                }
                else {
                    position = items_page * width_item;
                }
                break;
            default:
                init_position = max_items_page - items_page
                position = init_position * width_item;
                break;
        }

        return position;
    };

    function selectItem(obj_item, nav) {
        item_selected.removeClass("selected");
        obj_item.addClass("selected");
        item_selected = obj_item;

        setContent();
    };

    function navContent(obj_nav) {

        var item = item_selected.parent(),
            prev_item = item.prev().children().first(),
            next_item = item.next().children().first();

        if (obj_nav.attr("class").indexOf("prev") != -1) {
            if (item.prev().index() != -1) {
                selectItem(prev_item, "prev");
            }
        }
        else {
            if (item.next().index() != -1) {
                selectItem(next_item, "next");
            }
        }
    };

    function setContent() {
        var result = $("#result");

        result.removeClass("fade-in");
        result.addClass("fade-out");

        setTimeout(function () {
            $("img", result).attr("src", item_selected.attr("href"));
            $("h3", result).text(item_selected.attr("title"));
            $("p", result).text(item_selected.children(0).attr("alt"));
            result.removeClass("fade-out");
            result.addClass("fade-in");
        }, 400);        
    };

    function debug(obj) {
        if (window.console && window.console.log) {
            window.console.log(obj);
        }
    };

}(jQuery));