
var model = {
    currentDrow: null,
    Drows: [

        {
            title: 'Drow1',
            url: 'http://78.media.tumblr.com/71244f2b26710a6c94e46720c28d4f96/tumblr_nb06aqzW061rt2j9do1_500.png',
            count: 0
        },
        {
            title: 'Drow2',
            url: 'https://steamuserimages-a.akamaihd.net/ugc/792933198711157206/D13CB8AB7FF17525DCC7818578E2CF7443D90426/',
            count: 0
        },
        {
            title: 'Drow3',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsoXEQnrOAKaoC4ouUzL58C0IMSt1nb-c3Yug9YAXCSxQObYtvUQ',
            count: 0
        },
        {
            title: 'Drow4',
            url: 'https://qph.ec.quoracdn.net/main-qimg-b6abff36b7ade37b60c082bc9d9c20f7-c',
            count: 0
        },
    ]
}

$(function () {

    var controller = {
        init: function () {
            drListView.init();
            drView.init();
            admin.init();
        },
        getDrows: function () {
            return model.Drows;
        },
        getCurrentDrow: function () {
            return model.currentDrow;
        },
        setCurrentDrow: function (drow) {
            model.currentDrow = drow;
        },
        incrementCounter: function () {
            model.currentDrow.count++;
            drView.render();
        },
        addDrow: function (title, url) {
            model.Drows.push({ title: title, url: url, count: 0 });
            //console.log(model.Drows);
            drListView.init();
        },
        //Remove element from object array
        removeDrow: function (ttle) {
            //use map operator to perform array operations on Object arrays
            let index = $.map(model.Drows, function (item) {
                return item.title;
            }).indexOf(ttle);
            console.log($.map(model.Drows, function (item) {
                return item.title;
            }));
            console.log(model.Drows);
            if (index !== -1) {
                model.Drows.splice(index, 1);
            }
            drListView.init();
        }

    };

    var drView = {
        //Initially?
        init: function () {
            controller.setCurrentDrow(model.Drows[0]);
            this.render();
        },
        //Render Image of current drow
        render: function () {
            var currentDrow = controller.getCurrentDrow();
            //console.log(currentDrow);
            $('.show-image').empty();
            $('.show-image').append("<img src=" + currentDrow.url + ">");
        }
    };

    var drListView = {
        //Initially?
        init: function () {
            $('ul').empty();
            $('ul').off('click', 'li');
            this.render();
        },
        render: function () {
            //Render list of drows
            drows = controller.getDrows();
            //each was not useful in this case
            $.map(drows, function (ele, i) {
                //console.log(i)
                $('ul').append("<li id=" + i + ">" + ele.title + "</li>");
            });
            //Add click events for each list item
            $('ul').on('click', 'li', function (e) {
                let id = $(e.target).attr('id');
                controller.setCurrentDrow(model.Drows[id]);
                model.Drows[id].count++;
                drView.render();
            });
        }
    };

    var admin = {
        init: function () {
            this.toggleAdmin();
            this.getDrowValue();
            this.removeDrow();
        },
        toggleAdmin: function () {
            $('.toggleA').click(function (e) {
                let auth = prompt("What's my name for you?");
                if (auth.toLowerCase() == 'bubu') {
                    $('.form').toggleClass('hide');
                }
            });
        },
        getDrowValue: function () {
            $('.add-drow').click(function (e) {
                e.preventDefault();
                var title = $('input#title').val();
                var url = $('input#url').val();
                controller.addDrow(title, url);
            });
        },
        removeDrow: function () {
            $('#remove').click(function (e) {
                e.preventDefault();
                var title = $('input#title').val();
                controller.removeDrow(title);
            });
        }
    }

    controller.init();
});