YUI().use('node', 'event', 'json-parse', 'dataschema-json', function (Y) {
    Y.on('domready', function(event) {
        var previousIndex = 0;
        var nextIndex = 0;
        var nbItem = Y.all('#slideshow .gallery .control-operator').size();
        
        if (Y.one('#btnPlayPause')) {
            Y.one('#btnPlayPause').on('click', function(e) {
                document.location.hash="";
                nextIndex = 0;
                previousIndex = 0;
                Y.all('.items-'+nbItem+'.autoplay .item').toggleClass("play");
                Y.all('.items-'+nbItem+'.autoplay .item').toggleClass("paused");
                this.toggleClass("play");
                this.toggleClass("paused");
            });
        }
        
        pause = function(){
            var n = Y.one('#btnPlayPause');
            if (n && n.hasClass('play')){
                n.removeClass('play');
                n.addClass('paused');
                Y.all('.items-'+nbItem+'.autoplay .item').removeClass("play");
                Y.all('.items-'+nbItem+'.autoplay .item').addClass("paused");
            } 
        };
        
        var getIndexImage = function(){
            return (Math.round(Math.random()*2) + 1);
        };

        if (Y.one('#btnPrevious')) {
            Y.one('#btnPrevious').on('click', function(e) {
                pause();
                nextIndex = 0;
                if(previousIndex == 0){
                    previousIndex = getIndexImage();
                } else {
                    if(previousIndex ==1){
                        previousIndex = nbItem;
                    } else {
                        previousIndex--;
                    }
                }
                document.location.hash ='item-' + previousIndex;

            });
        }
        
        if (Y.one('#btnNext')) {
            Y.one('#btnNext').on('click', function(e) {
                pause();
                previousIndex = 0;
                if(nextIndex == 0){
                    nextIndex = getIndexImage();
                } else {
                    if(nextIndex == nbItem){
                        nextIndex = 1;
                    } else {
                        nextIndex++;
                    }
                }
                document.location.hash ='item-' + nextIndex;
            });
        }
        

    });
});