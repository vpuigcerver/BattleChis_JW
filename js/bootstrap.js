var BootStrap = {
    
    preload: function() {
        
        console.log('create');

        game.stage.backgroundColor = '#313131';

        game.load.image('background', 'media/img/battleChis.png');

        game.load.spritesheet('button', 'media/img/flixel-button.png', 80, 20);

        game.load.bitmapFont('nokia', 'media/fonts/nokia16.png', 'media/fonts/nokia16.xml');
    },

    create: function(){

        game.add.image(0, 0, 'background');

        //	Make some buttons to trigger the sounds
        this.makeButton('START', 600, 100);
        this.makeButton('OPTIONS', 600, 140);


    },
    
    makeButton: function (name, x, y) {

        var button = game.add.button(x, y, 'button', this.click, this, 0, 1, 2);
        button.name = name;
        button.scale.set(2, 1.5);
        button.smoothed = false;

        var text =  game.add.bitmapText(x, y + 7,'nokia', name,16);
        text.x += (button.width / 2) - (text.textWidth / 2);

    },

    click: function(button) {

        if(button.name){game.state.start('controller');}

    }
};