
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
            console.log(currentDrow);
            $('div').empty();
            $('div').append("<img src=" + currentDrow.url + ">");
        }
    };

    var drListView = {
        //Initially?
        init: function () {
            this.render();
        },
        render: function () {
            //Render list of drows
            drows = controller.getDrows();
            //each was not useful in this case
            $.map(drows, function (ele, i) {
                console.log(i)
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
    controller.init();
});